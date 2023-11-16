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
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import momoLogo from '@/assets/svg/momo-logo.svg';
import { theme } from '@/themes';
import { useAppDispatch, useDocumentTitle } from '@/hooks';
import vnpayLogo from '@/assets/svg/vnpay-logo.svg';

dayjs.locale('vi');

const { Title, Text } = Typography;

const breadcrumbItems = [
    {
        title: <Link to={config.routes.public.home}>Trang Chủ</Link>,
    },
    {
        title: 'Xác Nhận Đặt Hàng',
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

    const handleShowMyPurchased = () => {
        navigate(config.routes.customer.purchased);
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
                                        <Title level={2}>Cảm ơn bạn đã đặt hàng!</Title>
                                        <Text>
                                            Vui lòng kiểm tra trang
                                            <Link
                                                to={config.routes.customer.purchased}
                                                underline
                                                scroll
                                            >
                                                <Text>Dịch Vụ</Text>
                                                <Text>Của Tôi</Text>
                                            </Link>
                                            để sử dụng dịch vụ của chúng tôi.
                                        </Text>
                                    </St.ConfirmSuccessMsg>

                                    <Divider />

                                    <St.ConfirmTransaction>
                                        <Title level={3}>Ngày giao dịch</Title>
                                        <Text>
                                            {`Vào ${dayjs(order?.date).format(
                                                'dddd, DD/MM/YYYY (GMT Z)',
                                            )}`}
                                        </Text>
                                    </St.ConfirmTransaction>

                                    <Divider />

                                    <St.ConfirmPaymentMethod>
                                        <Title level={3}>Phương thức thanh toán</Title>

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
                                        <Title level={3}>Đơn hàng của bạn</Title>

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
                                            <Title level={3}>Tổng tiền hàng</Title>
                                            <Text>{order?.subTotal.toLocaleString()}đ</Text>
                                        </St.PaymentSubPrice>

                                        <St.PaymentSubPrice>
                                            <Title level={3}>Tiết kiệm</Title>
                                            <Text>{order?.discountPrice.toLocaleString()}đ</Text>
                                        </St.PaymentSubPrice>
                                    </Space>

                                    <Divider />

                                    <St.PaymentMainPrice>
                                        <Title level={3}>
                                            Tổng ({order?.listOrderItem.length} dịch vụ)
                                        </Title>
                                        <Text>{order?.finalPrice.toLocaleString()}đ</Text>
                                    </St.PaymentMainPrice>

                                    <Button
                                        block
                                        type="primary"
                                        size="large"
                                        onClick={handleShowMyPurchased}
                                    >
                                        {loading ? (
                                            <Loading3QuartersOutlined
                                                spin
                                                style={{ fontSize: '1.6rem' }}
                                            />
                                        ) : (
                                            'Xem dịch vụ đã mua'
                                        )}
                                    </Button>
                                </>
                            ) : (
                                <St.ConfirmErrorMsg>
                                    <AiOutlineCloseCircle size={80} color={theme.colors.error} />
                                    <Title level={2}>Thanh toán thất bại!</Title>
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
