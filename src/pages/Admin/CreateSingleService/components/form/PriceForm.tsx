import * as Styled from '@/pages/Admin/CreateSingleService/CreateSingleService.styled';

import { FormType } from '@/pages/Admin/CreateSingleService/CreateSingleService';
import { Col, Flex } from 'antd';
import InputPrice from '../data-entry/InputPrice';
import { TagsOutlined } from '@ant-design/icons';

type PriceFormProps = {
    form: FormType;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
};

const variants = [
    {
        label: 'Giá 3 tháng',
        name: '3_MONTH',
    },
    {
        label: 'Giá 6 tháng',
        name: '6_MONTH',
    },
    {
        label: 'Giá 9 tháng',
        name: '9_MONTH',
    },
    {
        label: 'Giá 12 tháng',
        name: '12_MONTH',
    },
];

const PriceForm = ({ form, onFinish, onFinishFailed }: PriceFormProps) => {
    return (
        <Styled.ServiceDetailForm
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            wrapperCol={{ span: 12 }}
            layout="vertical"
        >
            <Flex align="center" gap={16}>
                <Col span={8}>
                    <InputPrice label="Giá gốc" name="originalPrice" />
                </Col>
                <Col span={8}>
                    <InputPrice label="Giá ưu đãi" name="finalPrice" />
                </Col>
                <Col span={8}>
                    <Styled.SaleTag>
                        <TagsOutlined />
                        Giảm giá: 10%
                    </Styled.SaleTag>
                </Col>
            </Flex>

            {variants.map((variant, index) => {
                return (
                    <Flex align="center" gap={16} key={index}>
                        <Col span={8}>
                            <InputPrice label={variant.label} name={variant.name} />
                        </Col>

                        <Col span={8}>
                            <Styled.SaleTag>
                                <TagsOutlined />
                                Giảm giá: 10%
                            </Styled.SaleTag>
                        </Col>
                    </Flex>
                );
            })}
        </Styled.ServiceDetailForm>
    );
};

export default PriceForm;
