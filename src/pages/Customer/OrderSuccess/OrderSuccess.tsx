import * as St from './OrderSuccess.styled';

import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { Button, Divider, Skeleton, Space, Table, Typography, notification } from 'antd';
import { CheckoutType, OrderItemType } from '@/pages/Customer/Checkout/Checkout.type';
import { checkMoMoPayment, checkVNPayPayment } from '@/utils/paymentAPI';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import { CartType } from '@/pages/Customer/Cart/Cart.type';
import CheckoutColumn from '@/pages/Customer/Checkout/Checkout.columns';
import Container from '@/components/Container';
import Link from '@/components/Link';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { PaymentMethod } from '@/utils/enums';
import { cartSlice } from '@/layouts/MainLayout/slice';
import config from '@/config';
import cookieUtils from '@/utils/cookieUtils';
import { getCart } from '@/utils/cartAPI';
import moment from 'moment';
import momoLogo from '@/assets/svg/momo-logo.svg';
import { theme } from '@/themes';
import { useAppDispatch, useDocumentTitle } from '@/hooks';
import vnpayLogo from '@/assets/svg/vnpay-logo.svg';

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
    useDocumentTitle('Đặt Hàng | HouseMate');

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
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

                const paymentMethod = cookieUtils.getItem(config.cookies.payment);
                const response =
                    paymentMethod === PaymentMethod.MOMO
                        ? await checkMoMoPayment(location.search)
                        : await checkVNPayPayment(location.search);

                if (response.status !== 200) return;

                const data: CheckoutType = response.data;

                const { data: cartList }: { data: CartType[] } = await getCart();

                const orderList = data.listOrderItem.map((item: OrderItemType) => ({
                    ...item,
                    key: item.orderItemId,
                }));

                dispatch(cartSlice.actions.setLength(cartList.length));
                setOrder({ ...data, listOrderItem: orderList });

                cookieUtils.removeItem(config.cookies.payment);
            } catch (error: any) {
                api.error({
                    message: 'Lỗi',
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
                        <Skeleton loading={loading}>
                            {order ? (
                                <>
                                    <St.ConfirmSuccessMsg>
                                        <AiOutlineCheckCircle
                                            size={80}
                                            color={theme.colors.success}
                                        />
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
                                                src={
                                                    order.paymentMethod === PaymentMethod.VNPAY
                                                        ? vnpayLogo
                                                        : momoLogo
                                                }
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
                                        <Text>{order?.finalPrice.toLocaleString()}đ</Text>
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
                                <St.ConfirmErrorMsg>
                                    <AiOutlineCloseCircle size={80} color={theme.colors.error} />
                                    <Title level={2}>Payment failed!</Title>
                                </St.ConfirmErrorMsg>
                            )}
                        </Skeleton>
                    </St.ConfirmInner>
                </Container>
            </St.ConfirmSection>
        </>
    );
};

export default OrderSuccess;
