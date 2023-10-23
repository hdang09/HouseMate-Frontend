import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';

import { FormType } from '@/pages/Admin/CreateService/CreateService';
import { Col, Flex } from 'antd';
import InputPrice from '../data-entry/InputPrice';
import { TagsOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/hooks';
import { useEffect, useState } from 'react';
import { Category } from '@/utils/enums';

type PriceFormProps = {
    form: FormType;
    serviceType: string;
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

const PriceForm = ({ form, serviceType, onFinish, onFinishFailed }: PriceFormProps) => {
    const [show, setShow] = useState<number>(0);
    const [sale, setSale] = useState({
        sale: 0,
        ...Object.fromEntries(variants.map((variant) => [variant.name, 0])),
    });
    const createService = useAppSelector((state) => state.createService);

    const calculateSale = (name: string, period: number, originalPrice: number) => {
        if (createService.originalPrice === 0) {
            return 0;
        }

        const discount = Math.round(
            (1 - (createService as Record<string, any>)[name] / (originalPrice * period)) * 100,
        );
        return discount > 0 ? discount : 0;
    };

    const handleSale = () => {
        const { originalPrice, finalPrice } = createService;

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
    const sum = useAppSelector((state) => state.createService.originalPrice);

    useEffect(() => {
        setShow(createService.finalPrice);
        handleSale();
        form.setFieldValue('originalPrice', sum);
    }, [createService, form]);
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
                    <InputPrice
                        label="Giá gốc (1 tháng)"
                        name="originalPrice"
                        disable={false || serviceType === Category.PACKAGE_SERVICE.toLowerCase()}
                    />
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
