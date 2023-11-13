import * as Styled from '@/pages/Admin/ManageService/CreateService.styled';
import InputName from '@/pages/Admin/ManageService/components/data-entry/InputName';
import InputCategory from '@/pages/Admin/ManageService/components/data-entry/InputCategory';
import InputUnit from '@/pages/Admin/ManageService/components/data-entry/InputUnit';
import InputDescription from '@/pages/Admin/ManageService/components/data-entry/InputDescription';
import { FormType } from '@/pages/Admin/ManageService/CreateService';
import { Col, Row } from 'antd';
import { Category, ModalEnum } from '@/utils/enums';
import InputMinMax from '../data-entry/InputMinMax';
import { useEffect } from 'react';
import { useAppSelector } from '@/hooks';
import InputSaleStatus from '../data-entry/InputSaleStatus';

type InfoFormProps = {
    serviceType: string;
    form: FormType;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
    variant: string;
};

const InfoForm = ({ variant, serviceType, form, onFinish, onFinishFailed }: InfoFormProps) => {
    const serviceDetail = useAppSelector((state) => state.upload);

    const initialValues = {
        titleName: serviceDetail?.service.titleName,
        unit: serviceDetail?.service.unitOfMeasure,
        description: serviceDetail?.service.description,
        min: serviceDetail?.service.min,
        max: serviceDetail?.service.max,
        saleStatus: serviceDetail.service.saleStatus,
    };

    useEffect(() => {
        if (variant === ModalEnum.VIEW) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues]);
    return (
        <Styled.ServiceDetailForm
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            wrapperCol={{ span: 12 }}
            layout="vertical"
            initialValues={initialValues}
        >
            <InputName />
            <Row justify={'space-between'}>
                {serviceType === Category.SINGLE_SERVICE.toLowerCase() && (
                    <Col span={11}>
                        <InputCategory />
                    </Col>
                )}

                {variant === ModalEnum.VIEW && (
                    <Col span={11}>
                        <InputSaleStatus />
                    </Col>
                )}
                <Col span={11}>
                    <InputUnit serviceType={serviceType} label="Đơn vị dịch vụ" name="unit" />
                </Col>
            </Row>

            {serviceType === Category.SINGLE_SERVICE && (
                <Row align="middle" justify={'space-between'}>
                    <Col span={11}>
                        <InputMinMax label="Tối thiểu" name="min" />
                    </Col>
                    <Col span={11}>
                        <InputMinMax label="Tối đa" name="max" />
                    </Col>
                </Row>
            )}

            <InputDescription />
        </Styled.ServiceDetailForm>
    );
};

export default InfoForm;
