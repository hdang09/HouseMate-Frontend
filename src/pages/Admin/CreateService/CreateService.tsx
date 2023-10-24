import { Button, Col, Flex, Form } from 'antd';
import * as Styled from './CreateService.styled';
import { FormInstance } from 'antd/lib';

import InfoForm from '@/pages/Admin/CreateService/components/form/InfoForm';
import PriceForm from '@/pages/Admin/CreateService/components/form/PriceForm';
import VariantForm from './components/form/VariantForm';
import UploadImg from './components/upload/UploadImg';
import { useLocation } from 'react-router-dom';
import { Category } from '@/utils/enums';
import SingleServiceForm from './components/form/SingleServiceForm';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { createServiceSlice } from './components/slice';

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
const CreateSingleService = () => {
    const { pathname } = useLocation();
    const serviceType = pathname.split('/').pop()?.split('-')[1];

    const [form] = Form.useForm<FormType>();
    const dispatch = useAppDispatch();

    const onFinish = async (values: ValueType) => {
        console.log('Success:', values);
        if (serviceType === Category.PACKAGE_SERVICE.toLowerCase()) {
            dispatch(createServiceSlice.actions.setIsPackage(true));
        }
        dispatch(createServiceSlice.actions.setTitleName(values?.titleName));
        dispatch(createServiceSlice.actions.setDescription(values?.description));
        dispatch(createServiceSlice.actions.setUnit(values?.unit));
        dispatch(createServiceSlice.actions.setTypes(values?.types));
    };

    const createService = useAppSelector((state) => {
        state.createService;
    });

    console.log(createService);

    const onFinishFailed = async (values: any) => {
        console.log('Failed:', values);
    };

    return (
        <div>
            <Flex justify="space-between">
                <Col span={10}>
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
                <Col span={10}>
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
