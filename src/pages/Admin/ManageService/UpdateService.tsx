import { Button, Col, Flex, Form, UploadFile, App, notification } from 'antd';
import * as Styled from './CreateService.styled';
import { FormInstance } from 'antd/lib';

import InfoForm from '@/pages/Admin/ManageService/components/form/InfoForm';
import PriceForm from '@/pages/Admin/ManageService/components/form/PriceForm';
import VariantForm from './components/form/VariantForm';
import UploadImg from './components/upload/UploadImg';
import { useParams } from 'react-router-dom';
import { Category, ModalEnum } from '@/utils/enums';
import SingleServiceForm from './components/form/SingleServiceForm';
import { useAppDispatch, useDocumentTitle } from '@/hooks';
import { createServiceSlice } from './components/slice';
import { useEffect, useState } from 'react';
import { getInUsedPeriodConfig } from '@/utils/configAPI';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ServiceDetailType } from '@/pages/ServiceDetail/ServiceDetail.type';
import uploadSlice from './components/upload/slide';
import { getServiceById, updateService } from '@/utils/serviceAPI';

export type FormType = FormInstance;

interface ServiceList {
    service: string;
    quantity: number;
}
type ValueType = {
    '3_MONTH': number;
    '6_MONTH': number;
    '9_MONTH': number;
    '12_MONTH': number;
    description: string;
    finalPrice: number;
    originalPrice: number;
    titleName: string;
    servicesList: ServiceList[];
    types: string[];
    unit: string;
    saleStatus: string;
    min: number;
    max: number;
};

export interface ConfigType {
    configId: number;
    configValue: number;
    configName: string;
    min: number;
    max: number;
    dateStart: string;
    dateEnd: string;
}

export interface ConfigMap {
    [key: number]: ConfigType;
}
const UpdateService = () => {
    const { id } = useParams();

    const [serviceDetail, setServiceDetail] = useState<ServiceDetailType>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useDocumentTitle(
        serviceDetail?.service.package
            ? 'Chi Tiết Gói Dịch Vụ | HouseMate'
            : 'Chi Tiết Dịch Vụ Đơn Lẻ | HouseMate',
    );

    useEffect(() => {
        const getServiceDetail = async () => {
            if (id) {
                const { data: serviceDetail }: { data: ServiceDetailType } = await getServiceById(
                    Number.parseInt(id),
                );
                setServiceDetail(serviceDetail);

                const convertedFileList: UploadFile[] = serviceDetail?.service.images.map(
                    (image) => ({
                        uid: image.imageId.toString(), // You need to provide a unique identifier
                        name: image.imageUrl,
                        status: 'done',
                        url: image.imageUrl,
                    }),
                );

                setFileList(convertedFileList);
                dispatch(uploadSlice.actions.setServiceDetail(serviceDetail));
            }
        };
        getServiceDetail();
    }, []);

    const [form] = Form.useForm<FormType>();

    const [api, contextHolder] = notification.useNotification();

    const { modal } = App.useApp();

    const dispatch = useAppDispatch();

    const confirm = () => {
        modal.confirm({
            maskClosable: true,
            title: 'Bạn có muốn thay đổi thông tin dịch vụ này?',
            icon: <ExclamationCircleOutlined />,
            content:
                'Dịch vụ sau khi được thay đổi thông tin sẽ áp dụng ở cửa hàng. Nhấn "Xác nhận" để thay đổi thông tin dịch vụ.',
            okText: 'Xác nhận',
            cancelText: 'Huỷ',
            onOk: () => {
                form.submit();
            },
        });
    };

    const onFinish = async (values: ValueType) => {
        console.log('Success:', values);
        let service = {};
        if (serviceDetail?.packageServiceItemList) {
            const list = serviceDetail?.packageServiceItemList.map((service) => ({
                [service.singleServiceId]: service.quantity,
            }));

            const serviceChildList = Object.assign({}, ...list);
            if (serviceDetail?.service.package) {
                service = {
                    periodPriceServiceList: {
                        '3': values['3_MONTH'],
                        '6': values['6_MONTH'],
                        '9': values['9_MONTH'],
                        '12': values['12_MONTH'],
                    },
                    originalPrice: values.originalPrice,
                    finalPrice: values.finalPrice,
                    groupType: serviceDetail.service.groupType,
                    titleName: values.titleName,
                    description: values.description,
                    serviceChildList,
                    unitOfMeasure: values.unit,
                    isPackage: true,
                    saleStatus: values.saleStatus,
                };
            }
        } else {
            service = {
                periodPriceServiceList: {
                    '3': values['3_MONTH'],
                    '6': values['6_MONTH'],
                    '9': values['9_MONTH'],
                    '12': values['12_MONTH'],
                },
                originalPrice: values.originalPrice,
                finalPrice: values.finalPrice,
                groupType: serviceDetail?.service.groupType,
                titleName: values.titleName,
                typeNameList: values.types,
                description: values.description,
                unitOfMeasure: values.unit,
                isPackage: false,
                saleStatus: values.saleStatus,
                min: serviceDetail?.service.groupType === 'RETURN_SERVICE' ? 0 : values.min,
                max: serviceDetail?.service.groupType === 'RETURN_SERVICE' ? 0 : values.max,
            };
        }
        try {
            if (id) {
                const { data: newServiceDetail }: { data: ServiceDetailType } = await updateService(
                    service,
                    +id,
                );
                setServiceDetail(newServiceDetail);
                api.success({
                    message: 'Success',
                    description: 'Thay đổi thành công',
                });
                dispatch(createServiceSlice.actions.reset());
            }
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.response ? error.response.data : error.message,
            });
            console.log(error.response ? error.response.data : error.message);
        } finally {
            setFileList([]);
        }
    };

    const onFinishFailed = async (values: any) => {
        console.log('Failed:', values);
    };

    useEffect(() => {
        (async () => {
            try {
                const { data }: { data: ConfigType[] } = await getInUsedPeriodConfig();

                const configObject: ConfigMap = {};
                data.forEach((item) => {
                    configObject[item.configValue] = item;
                });
                dispatch(createServiceSlice.actions.setPriceConfig(configObject));
            } catch (error: any) {
                console.log(error.response ? error.response.data : error.message);
            } finally {
            }
        })();
    }, [id]);

    return (
        <Styled.Container>
            {contextHolder}
            <Flex justify="space-between">
                <Col span={11}>
                    <Styled.PageTitle>Thông tin dịch vụ</Styled.PageTitle>
                    <InfoForm
                        variant={ModalEnum.VIEW}
                        serviceType={
                            serviceDetail?.service.package
                                ? Category.PACKAGE_SERVICE
                                : Category.SINGLE_SERVICE
                        }
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    />
                    <Styled.PageTitle>Giá dịch vụ</Styled.PageTitle>
                    <PriceForm
                        variant={ModalEnum.VIEW}
                        form={form}
                        serviceType={
                            serviceDetail?.service.package
                                ? Category.PACKAGE_SERVICE
                                : Category.SINGLE_SERVICE
                        }
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    />
                </Col>
                <Col span={11}>
                    <Styled.PageTitle>
                        {!serviceDetail?.service.package
                            ? 'Phân Loại dịch vụ'
                            : 'Dịch vụ trong gói'}
                    </Styled.PageTitle>
                    {!serviceDetail?.service.package && (
                        <VariantForm
                            typeList={serviceDetail?.typeList?.map((type) => type.typeName) || []}
                            form={form}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        />
                    )}
                    {serviceDetail?.service.package && (
                        <SingleServiceForm
                            variant={ModalEnum.VIEW}
                            form={form}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        />
                    )}
                    <Styled.Picture>
                        <Styled.PageTitle>Hình ảnh dịch vụ</Styled.PageTitle>
                        <UploadImg
                            api={api}
                            variant={ModalEnum.VIEW}
                            form={form}
                            fileList={fileList}
                            setFileList={setFileList}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        />
                    </Styled.Picture>
                </Col>
            </Flex>
            <Flex justify="center">
                <Button type="primary" htmlType="submit" onClick={() => confirm()}>
                    Thay đổi
                </Button>
            </Flex>
        </Styled.Container>
    );
};

export default UpdateService;
