import { Button, Divider, Skeleton, Space, Table, Typography, notification } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

import vnpayLogo from '@/assets/svg/vnpay-logo.svg';
import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';
import { CheckoutType, OrderItemType } from '@/pages/Customer/Checkout/Checkout.type';
import CheckoutColumn from '@/pages/Customer/Checkout/Checkout.columns';
import { theme } from '@/themes';
import { checkPayment } from '@/utils/paymentAPI';

import * as St from './OrderSuccess.styled';

const { Title, Text } = Typography;

const breadcrumbItems = [
    {
        title: <Link to={config.routes.public.home}>Home</Link>,
    },
    {
        title: 'Confirm',
    },
];

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });
    const [order, setOrder] = useState<CheckoutType>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Call api to get cart list
        (async () => {
            try {
                setLoading(true);

                const response = await checkPayment(location.search);

                if (response.status === 200) {
                    const data: CheckoutType = response.data;

                    const orderList = data.listOrderItem.map((item: OrderItemType) => ({
                        ...item,
                        key: item.orderItemId,
                    }));

                    setOrder({ ...data, listOrderItem: orderList });
                }
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleContinueShopping = () => {
        navigate(config.routes.public.shop);
    };

    return (
        <>
            {contextHolder}

            <BreadcrumbBanner
                title={{
                    firstLine: 'Welcome to',
                    secondLine: ['House', 'Mate'],
                    thirdLine: 'cart service!',
                }}
                breadcrumbItems={breadcrumbItems}
            />

            <St.ConfirmSection>
                <Container>
                    <St.ConfirmInner>
                        {order ? (
                            <>
                                <St.ConfirmSuccessMsg>
                                    <AiOutlineCheckCircle size={80} color={theme.colors.success} />
                                    <Title level={2}>Thank for your order !</Title>
                                    <Text>
                                        Please check the
                                        <Link
                                            to={config.routes.customer.purchased}
                                            underline
                                            scroll
                                        >
                                            <Text>My</Text>
                                            <Text>Purchased</Text>
                                        </Link>
                                        page to use our service.
                                    </Text>
                                </St.ConfirmSuccessMsg>

                                <Divider />

                                <St.ConfirmTransaction>
                                    <Title level={3}>Transaction date</Title>
                                    <Text>
                                        {moment(order?.date)
                                            .locale('vi')
                                            .format('dddd, MMMM D, YYYY (GMT Z)')}
                                    </Text>
                                </St.ConfirmTransaction>

                                <Divider />

                                <St.ConfirmPaymentMethod>
                                    <Title level={3}>Payment method</Title>

                                    <figure>
                                        <img
                                            src={vnpayLogo}
                                            loading="lazy"
                                            decoding="async"
                                            alt={order?.paymentMethod}
                                        />
                                    </figure>
                                </St.ConfirmPaymentMethod>

                                <Divider />

                                <St.ConfirmCartList>
                                    <Title level={3}>Your order</Title>

                                    <Table
                                        columns={CheckoutColumn()}
                                        loading={loading}
                                        dataSource={order && order.listOrderItem}
                                        pagination={false}
                                        scroll={{ x: true }}
                                    />
                                </St.ConfirmCartList>

                                <Divider />

                                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                    <St.PaymentSubPrice>
                                        <Title level={3}>Subtotal</Title>
                                        <Text>{order?.subTotal.toLocaleString()}đ</Text>
                                    </St.PaymentSubPrice>

                                    <St.PaymentSubPrice>
                                        <Title level={3}>Discount</Title>
                                        <Text>{order?.discountPrice.toLocaleString()}đ</Text>
                                    </St.PaymentSubPrice>
                                </Space>

                                <Divider />

                                <St.PaymentMainPrice>
                                    <Title level={3}>
                                        Total {order?.listOrderItem.length} item(s)
                                    </Title>
                                    <Text>${order?.finalPrice}</Text>
                                </St.PaymentMainPrice>

                                <Button
                                    block
                                    type="primary"
                                    size="large"
                                    onClick={handleContinueShopping}
                                >
                                    {loading ? (
                                        <Loading3QuartersOutlined
                                            spin
                                            style={{ fontSize: '1.6rem' }}
                                        />
                                    ) : (
                                        ' Continue shopping'
                                    )}
                                </Button>
                            </>
                        ) : (
                            <Skeleton loading={loading}>
                                <St.ConfirmErrorMsg>
                                    <AiOutlineCloseCircle size={80} color={theme.colors.error} />
                                    <Title level={2}>Payment failed!</Title>
                                </St.ConfirmErrorMsg>
                            </Skeleton>
                        )}
                    </St.ConfirmInner>
                </Container>
            </St.ConfirmSection>
        </>
    );
};

export default OrderSuccess;
