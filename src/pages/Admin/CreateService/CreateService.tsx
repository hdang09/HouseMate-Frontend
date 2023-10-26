import { Button, Col, Flex, Form, UploadFile, notification } from 'antd';
import * as Styled from './CreateService.styled';
import { FormInstance } from 'antd/lib';

import InfoForm from '@/pages/Admin/CreateService/components/form/InfoForm';
import PriceForm from '@/pages/Admin/CreateService/components/form/PriceForm';
import VariantForm from './components/form/VariantForm';
import UploadImg from './components/upload/UploadImg';
import { useLocation } from 'react-router-dom';
import { Category, GroupType, ImageEnum } from '@/utils/enums';
import SingleServiceForm from './components/form/SingleServiceForm';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { createServiceSlice } from './components/slice';
import { useEffect, useState } from 'react';
import { createNewService } from '@/utils/serviceAPI';
import { uploadServiceImage } from '@/utils/uploadAPI';
import { getInUsedPeriodConfig } from '@/utils/periodConfigAPI';

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
const CreateSingleService = () => {
    const { pathname } = useLocation();
    const serviceType = pathname.split('/').pop()?.split('-')[1];

    const [form] = Form.useForm<FormType>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const createService = useAppSelector((state) => state.createService);
    const imageList = useAppSelector((state) => state.upload.imageUrls);

    const {
        originalPrice,
        finalPrice,
        groupType,
        serviceList,
        periodPriceServiceList,
        min,
        max,
        unitOfProduct,
    } = createService;
    const [api, contextHolder] = notification.useNotification();

    const dispatch = useAppDispatch();

    useEffect(() => {
        form.resetFields();
    }, [serviceType]);

    const onFinish = async (values: ValueType) => {
        console.log('Success:', values);

        const list = serviceList.map((service) => ({
            [service.serviceID]: service.quantity,
        }));

        const serviceChildList = Object.assign({}, ...list);

        let service;

        if (serviceType === Category.PACKAGE_SERVICE.toLowerCase()) {
            service = {
                periodPriceServiceList,
                originalPrice,
                finalPrice,
                groupType: GroupType.HOURLY_SERVICE, //TODO : WAITING FOR BE ADD GROUP OTHER TO ENUM
                titleName: values.titleName,
                description: values.description,
                serviceChildList,
                unitOfMeasure: values.unit,
                isPackage: true,
                saleStatus: 'AVAILABLE',
            };
        } else {
            service = {
                periodPriceServiceList,
                originalPrice,
                finalPrice,
                groupType,
                titleName: values.titleName,
                typeNameList: values.types,
                description: values.description,
                unitOfMeasure: values.unit,
                isPackage: false,
                saleStatus: 'AVAILABLE',
                min,
                max,
                unitOfProduct,
            };
        }
        try {
            const { data } = await createNewService(service);
            console.log(data);
            await uploadServiceImage(imageList, ImageEnum.SERVICE, data?.service?.serviceId);

            api.success({
                message: 'Success',
                description: 'Tạo thành công',
            });
            form.resetFields();
            dispatch(createServiceSlice.actions.reset());
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
    }, []);

    return (
        <div>
            {contextHolder}
            <Flex justify="space-between">
                <Col span={11}>
                    <Styled.PageTitle>Thông tin dịch vụ</Styled.PageTitle>
                    <InfoForm
                        serviceType={serviceType || Category.SINGLE_SERVICE}
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    />
                    <Styled.PageTitle>Giá dịch vụ</Styled.PageTitle>
                    <PriceForm
                        form={form}
                        serviceType={serviceType || Category.SINGLE_SERVICE}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    />
                </Col>
                <Col span={11}>
                    <Styled.PageTitle>
                        {Category.SINGLE_SERVICE.toLowerCase() === serviceType
                            ? 'Phân Loại dịch vụ'
                            : 'Dịch vụ trong gói'}
                    </Styled.PageTitle>
                    {Category.SINGLE_SERVICE.toLowerCase() === serviceType && (
                        <VariantForm
                            form={form}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        />
                    )}
                    {Category.PACKAGE_SERVICE.toLowerCase() === serviceType && (
                        <SingleServiceForm
                            form={form}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        />
                    )}
                    <Styled.Picture>
                        <Styled.PageTitle>Hình ảnh dịch vụ</Styled.PageTitle>
                        <UploadImg
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
                <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                    Tạo dịch vụ
                </Button>
            </Flex>
        </div>
    );
};

export default CreateSingleService;
