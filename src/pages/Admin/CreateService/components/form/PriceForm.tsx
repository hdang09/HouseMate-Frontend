import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';

import { FormType } from '@/pages/Admin/CreateService/CreateService';
import { Col, Flex } from 'antd';
import InputPrice from '../data-entry/InputPrice';
import { TagsOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/hooks';
import { useEffect, useState } from 'react';
import { Category, PeriodEnum } from '@/utils/enums';

type PriceFormProps = {
    form: FormType;
    serviceType: string;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
};

const PriceForm = ({ form, serviceType, onFinish, onFinishFailed }: PriceFormProps) => {
    const createService = useAppSelector((state) => state.createService);

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

    const [show, setShow] = useState<number>(0);
    const [sale, setSale] = useState({
        sale: 0,
        ...Object.fromEntries(variants.map((variant) => [variant.name, 0])),
    });

    const calculateSale = (period: number, originalPrice: number) => {
        if (createService.originalPrice === 0) {
            return 0;
        }

        const discount = Math.round(
            (1 -
                (createService.periodPriceServiceList as Record<string, any>)[period] /
                    (originalPrice * period)) *
                100,
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
                    calculateSale(variant.period, originalPrice),
                ]),
            ),
        };

        setSale(updatedSale);
    };
    const sum = useAppSelector((state) => state.createService.originalPrice);
    const priceConfig = useAppSelector((state) => state.createService.configPrice);
    useEffect(() => {
        setShow(createService.finalPrice);
        handleSale();
        serviceType === Category.PACKAGE_SERVICE.toLowerCase() &&
            form.setFieldValue('originalPrice', sum);
    }, [createService, form, serviceType]);

    return (
        <Styled.ServiceDetailForm
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            wrapperCol={{ span: 12 }}
            layout="vertical"
        >
            <Flex align="center">
                <Col span={8}>
                    <InputPrice
                        label="Giá gốc (1 tháng)"
                        name="originalPrice"
                        width={150}
                        dependencies={'originalPrice'}
                        disable={serviceType === Category.PACKAGE_SERVICE.toLowerCase()}
                    />
                </Col>
                <Col span={8}>
                    <InputPrice
                        label="Giá ưu đãi"
                        name="finalPrice"
                        disable={false}
                        width={150}
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
                let label = variant.label;
                switch (variant.name) {
                    case PeriodEnum['3_MONTH']:
                        label =
                            label +
                            ` (từ ${Math.floor(
                                createService.originalPrice * priceConfig[3]?.min,
                            ).toLocaleString()}đ -> ${Math.floor(
                                createService.originalPrice * priceConfig[3]?.max,
                            ).toLocaleString()}đ)`;
                        break;
                    case PeriodEnum['6_MONTH']:
                        label =
                            label +
                            ` (từ ${Math.floor(
                                createService.originalPrice * priceConfig[6]?.min,
                            ).toLocaleString()}đ -> ${Math.floor(
                                createService.originalPrice * priceConfig[6]?.max,
                            ).toLocaleString()}đ)`;
                        break;
                    case PeriodEnum['9_MONTH']:
                        label =
                            label +
                            ` (từ ${Math.floor(
                                createService.originalPrice * priceConfig[9]?.min,
                            ).toLocaleString()}đ -> ${Math.floor(
                                createService.originalPrice * priceConfig[9]?.max,
                            ).toLocaleString()}đ)`;
                        break;
                    case PeriodEnum['12_MONTH']:
                        label =
                            label +
                            ` (từ ${Math.floor(
                                createService.originalPrice * priceConfig[12]?.min,
                            ).toLocaleString()}đ -> ${Math.floor(
                                createService.originalPrice * priceConfig[12]?.max,
                            ).toLocaleString()}đ)`;
                        break;
                    default:
                        label = label;
                }
                return (
                    <Flex align="center" key={index} justify="space-between">
                        <Col span={15}>
                            <InputPrice
                                label={label}
                                name={variant.name}
                                width={323}
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
