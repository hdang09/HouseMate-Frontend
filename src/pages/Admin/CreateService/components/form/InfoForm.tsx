import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';
import InputName from '@/pages/Admin/CreateService/components/data-entry/InputName';
import InputCategory from '@/pages/Admin/CreateService/components/data-entry/InputCategory';
import InputUnit from '@/pages/Admin/CreateService/components/data-entry/InputUnit';
import InputDescription from '@/pages/Admin/CreateService/components/data-entry/InputDescription';
import { FormType } from '@/pages/Admin/CreateService/CreateService';
import { Col, Row } from 'antd';
import { Category } from '@/utils/enums';
import InputMinMax from '../data-entry/InputMinMax';

type InfoFormProps = {
    serviceType: string;
    form: FormType;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
};

const InfoForm = ({ serviceType, form, onFinish, onFinishFailed }: InfoFormProps) => {
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
                {serviceType === Category.SINGLE_SERVICE.toLowerCase() && (
                    <Col span={11}>
                        <InputCategory />
                    </Col>
                )}

                <Col span={11}>
                    <InputUnit serviceType={serviceType} label="Đơn vị dịch vụ" name="unit" />
                </Col>
            </Row>

            <Row align="middle">
                <Col span={8}>
                    <InputMinMax label="Tối thiểu" name="min" />
                </Col>
                <Col span={8}>
                    <InputMinMax label="Tối đa" name="max" />
                </Col>
                <Col span={8}>
                    <InputUnit
                        serviceType={serviceType}
                        label="Đơn vị sản phẩm"
                        name="unitProduct"
                    />
                </Col>
            </Row>
            <InputDescription />
        </Styled.ServiceDetailForm>
    );
};

export default InfoForm;
