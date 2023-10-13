import { ColumnsType } from 'antd/es/table';
import { CheckoutType } from './Checkout.type';

import * as St from './Checkout.styled';
import { Image, Typography } from 'antd';

const { Text } = Typography;

const CheckoutColumn = () => {
    const columns: ColumnsType<CheckoutType> = [
        {
            title: 'Service',
            dataIndex: 'service',
            render: (service) => (
                <St.CheckoutServiceName>
                    <Image src={service.serviceImage} alt={service.serviceName} preview={false} />
                    <Text>{service.serviceName}</Text>
                </St.CheckoutServiceName>
            ),
        },
        {
            title: 'Variant',
            dataIndex: 'variant',
            render: (variant) => (
                <St.CheckoutVariantName>{variant.variantName}</St.CheckoutVariantName>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (quantity: number) => (
                <St.CheckoutServiceQuantity>{quantity}</St.CheckoutServiceQuantity>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (price: number) => (
                <St.CheckoutServicePrice>{price.toLocaleString()}$</St.CheckoutServicePrice>
            ),
        },
    ];

    return columns;
};

export default CheckoutColumn;
