import * as Styled from '@/pages/Admin/CreateSingleService/CreateSingleService.styled';

import { FormType } from '@/pages/Admin/CreateSingleService/CreateSingleService';
import { Col, Flex } from 'antd';
import InputPrice from '../data-entry/InputPrice';
import { TagsOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/hooks';
import { useEffect, useState } from 'react';

type PriceFormProps = {
    form: FormType;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
};

const variants = [
    {
        label: 'Giá 3 tháng',
        name: '3_MONTH',
        period: 3,
    },
    {
        label: 'Giá 6 tháng',
        name: '6_MONTH',
        period: 6,
    },
    {
        label: 'Giá 9 tháng',
        name: '9_MONTH',
        period: 9,
    },
    {
        label: 'Giá 12 tháng',
        name: '12_MONTH',
        period: 12,
    },
];

const PriceForm = ({ form, onFinish, onFinishFailed }: PriceFormProps) => {
    const [show, setShow] = useState<number>(0);
    const [sale, setSale] = useState({
        sale: 0,
        ...Object.fromEntries(variants.map((variant) => [variant.name, 0])),
    });
    const singleService = useAppSelector((state) => state.singleService);

    const calculateSale = (name: string, period: number, originalPrice: number) => {
        if (singleService.originalPrice === 0) {
            return 0;
        }

        const discount = Math.round(
            (1 - (singleService as Record<string, any>)[name] / (originalPrice * period)) * 100,
        );
        return discount > 0 ? discount : 0;
    };

    const handleSale = () => {
        const { originalPrice, finalPrice } = singleService;

        const sale =
            originalPrice === 0 ? 0 : Number(((1 - finalPrice / originalPrice) * 100).toFixed(0));

        const updatedSale = {
            sale: sale >= 0 ? sale : 0,
            ...Object.fromEntries(
                variants.map((variant) => [
                    variant.name,
                    calculateSale(variant.name, variant.period, originalPrice),
                ]),
            ),
        };

        setSale(updatedSale);
    };

    const handleSubmit = (value: any) => {
        console.log(value);
        onFinish;
    };

    useEffect(() => {
        setShow(singleService.finalPrice);
        handleSale();
        console.log(sale);
    }, [singleService]);
    return (
        <Styled.ServiceDetailForm
            form={form}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            wrapperCol={{ span: 12 }}
            layout="vertical"
        >
            <Flex align="center" gap={16}>
                <Col span={8}>
                    <InputPrice label="Giá gốc (1 tháng)" name="originalPrice" disable={false} />
                </Col>
                <Col span={8}>
                    <InputPrice
                        label="Giá ưu đãi"
                        name="finalPrice"
                        disable={false}
                        dependencies={'originalPrice'}
                    />
                </Col>
                <Col span={8}>
                    <Styled.SaleTag>
                        <TagsOutlined />
                        Giảm giá: {sale.sale}%
                    </Styled.SaleTag>
                </Col>
            </Flex>

            {variants.map((variant, index) => {
                return (
                    <Flex align="center" gap={16} key={index}>
                        <Col span={8}>
                            <InputPrice
                                label={variant.label}
                                name={variant.name}
                                disable={show > 0 ? false : true}
                                dependencies={'originalPrice'}
                            />
                        </Col>

                        <Col span={8}>
                            <Styled.SaleTag>
                                <TagsOutlined />
                                Giảm giá: {(sale as Record<string, number>)[variant.name]}%
                            </Styled.SaleTag>
                        </Col>
                    </Flex>
                );
            })}
        </Styled.ServiceDetailForm>
    );
};

export default PriceForm;
