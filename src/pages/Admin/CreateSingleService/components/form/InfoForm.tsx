import * as Styled from '@/pages/Admin/CreateSingleService/CreateSingleService.styled';
import InputName from '@/pages/Admin/CreateSingleService/components/data-entry/InputName';
import InputCategory from '@/pages/Admin/CreateSingleService/components/data-entry/InputCategory';
import InputUnit from '@/pages/Admin/CreateSingleService/components/data-entry/InputUnit';
import InputDescription from '@/pages/Admin/CreateSingleService/components/data-entry/InputDescription';
import { FormType } from '@/pages/Admin/CreateSingleService/CreateSingleService';
import { Col, Row } from 'antd';
// import { useEffect } from 'react';

type InfoFormProps = {
    form: FormType;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
};

const InfoForm = ({ form, onFinish, onFinishFailed }: InfoFormProps) => {
    return (
        <Styled.ServiceDetailForm
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            wrapperCol={{ span: 12 }}
            layout="vertical"
        >
            <InputName />
            <Row justify={'space-between'}>
                <Col span={11}>
                    <InputCategory />
                </Col>
                <Col span={11}>
                    <InputUnit />
                </Col>
            </Row>
            <InputDescription />
        </Styled.ServiceDetailForm>
    );
};

export default InfoForm;
