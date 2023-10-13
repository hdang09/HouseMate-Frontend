import { Image, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { CheckoutType } from './Checkout.type';

import { CartServiceInfo } from '@/pages/Customer/Cart/Cart.styled';
import * as St from './Checkout.styled';

const { Text } = Typography;

const CheckoutColumn = () => {
    const columns: ColumnsType<CheckoutType> = [
        {
            title: 'Service',
            dataIndex: 'service',
            render: (service) => (
                <CartServiceInfo>
                    <Image src={service.serviceImage} alt={service.serviceName} preview={false} />
                    <Text>{service.serviceName}</Text>
                </CartServiceInfo>
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
