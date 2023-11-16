import { Image, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

import fallbackImage from '@/assets/images/fallback-img.png';
import config from '@/config';
import { CartServiceInfo } from '@/pages/Customer/Cart/Cart.styled';

import { OrderItemType } from './Checkout.type';
import * as St from './Checkout.styled';

const { Text } = Typography;

const CheckoutColumn = () => {
    const columns: ColumnsType<OrderItemType> = [
        {
            title: 'Dịch vụ',
            render: (record: OrderItemType) => (
                <CartServiceInfo to={`${config.routes.public.shop}/${record.service.serviceId}`}>
                    <Image
                        src={
                            record.service.images && record.service.images.length > 0
                                ? record.service.images[0].imageUrl
                                : ''
                        }
                        alt={record.service.titleName}
                        preview={false}
                        fallback={fallbackImage}
                    />
                    <Text>{record.service.titleName}</Text>
                </CartServiceInfo>
            ),
        },
        {
            title: 'Chu kỳ',
            width: 120,
            render: (record: OrderItemType) => (
                <St.CheckoutVariantName>
                    {record.periodName.replace('MONTH', 'tháng')}
                </St.CheckoutVariantName>
            ),
        },
        {
            title: 'Đơn giá',
            width: 120,
            render: (record: OrderItemType) => (
                <St.CheckoutServicePrice>
                    {record.finalPrice.toLocaleString()}đ
                </St.CheckoutServicePrice>
            ),
        },
        {
            title: 'Số lượng',
            width: 120,
            render: (record: OrderItemType) => (
                <St.CheckoutServiceQuantity>{record.quantity}</St.CheckoutServiceQuantity>
            ),
        },
        {
            title: 'Thành tiền',
            width: 120,
            render: (record: OrderItemType) => (
                <St.CheckoutServicePrice>
                    {(record.finalPrice * record.quantity).toLocaleString()}đ
                </St.CheckoutServicePrice>
            ),
        },
    ];

    return columns;
};

export default CheckoutColumn;
