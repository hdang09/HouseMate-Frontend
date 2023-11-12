import { ConfigMap, FormType } from '@/pages/Admin/ManageService/CreateService';
import * as Styled from '@/pages/Admin/Setting/Setting.styled';
import InputPriceConfig from '../data-entry/InputPriceConfig';
import { Row } from 'antd';
import { useEffect } from 'react';

type PriceConfigFormProps = {
    form: FormType;
    priceConfig: ConfigMap;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
};

const variants = [
    {
        min: {
            label: 'Tỉ giá 3 tháng tối thiểu',
            name: '3_min',
            period: 3,
        },
        max: {
            label: 'Tỉ giá 3 tháng tối đa',
            name: '3_max',
            period: 3,
        },
    },
    {
        min: {
            label: 'Tỉ giá 6 tháng tối thiểu',
            name: '6_min',
            period: 6,
        },
        max: {
            label: 'Tỉ giá 6 tháng tối đa',
            name: '6_max',
            period: 6,
        },
    },
    {
        min: {
            label: 'Tỉ giá 9 tháng tối thiểu',
            name: '9_min',
            period: 9,
        },
        max: {
            label: 'Tỉ giá 9 tháng tối đa',
            name: '9_max',
            period: 9,
        },
    },
    {
        min: {
            label: 'Tỉ giá 12 tháng tối thiểu',
            name: '12_min',
            period: 12,
        },
        max: {
            label: 'Tỉ giá 12 tháng tối đa',
            name: '12_max',
            period: 12,
        },
    },
];

const PriceConfigForm = ({ priceConfig, form, onFinish, onFinishFailed }: PriceConfigFormProps) => {
    useEffect(() => {
        form.setFieldsValue({
            '3_min': priceConfig[3]?.min,
            '3_max': priceConfig[3]?.max,
            '6_max': priceConfig[6]?.max,
            '6_min': priceConfig[6]?.min,
            '9_max': priceConfig[9]?.max,
            '9_min': priceConfig[9]?.min,
            '12_max': priceConfig[12]?.max,
            '12_min': priceConfig[12]?.min,
        });
    }, [priceConfig]);

    return (
        <Styled.SettingForm
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            wrapperCol={{ span: 12 }}
            layout="vertical"
        >
            {variants.map((variant, index) => {
                return (
                    <Row justify={'space-between'} key={index}>
                        <InputPriceConfig label={variant.min.label} name={variant.min.name} />
                        <InputPriceConfig label={variant.max.label} name={variant.max.name} />
                    </Row>
                );
            })}
        </Styled.SettingForm>
    );
};

export default PriceConfigForm;
