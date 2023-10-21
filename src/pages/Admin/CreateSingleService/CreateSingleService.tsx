import { Button, Col, Flex, Form } from 'antd';
import * as Styled from './CreateSingleService.styled';
import { FormInstance } from 'antd/lib';

import InfoForm from '@/pages/Admin/CreateSingleService/components/form/InfoForm';
import PriceForm from '@/pages/Admin/CreateSingleService/components/form/PriceForm';
import VariantForm from './components/form/VariantForm';
import UploadImg from './components/upload/UploadImg';

export type FormType = FormInstance;

const CreateSingleService = () => {
    const [form] = Form.useForm<FormType>();

    const onFinish = async (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = async (values: any) => {
        console.log('Failed:', values);
    };

    return (
        <div>
            <Flex justify="space-between">
                <Col span={10}>
                    <Styled.PageTitle>Thông tin dịch vụ</Styled.PageTitle>
                    <InfoForm form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} />
                    <Styled.PageTitle>Giá dịch vụ</Styled.PageTitle>
                    <PriceForm form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} />
                </Col>
                <Col span={10}>
                    <Styled.PageTitle>Phân Loại dịch vụ</Styled.PageTitle>
                    <VariantForm form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} />
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
