import { Button, Divider, Space, Table, Typography } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

import vnpayLogo from '@/assets/svg/vnpay-logo.svg';
import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';
import { CheckoutType } from '@/pages/Customer/Checkout/Checkout.type';
import CheckoutColumn from '@/pages/Customer/Checkout/Checkout.columns';
import { theme } from '@/themes';

import * as St from './OrderSuccess.styled';
import moment from 'moment';

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
    const navigate = useNavigate();

    const data: CheckoutType = {
        address: '',
        complete: true,
        date: '2023-10-10T13:36:43',
        discountPrice: 1,
        email: '',
        finalPrice: 2,
        fullName: '',
        orderId: 1,
        phone: '0916207758',
        paymentMethod: 'vnpay',
        subTotal: 1,
        userId: 1,
        listOrderItem: [
            {
                discountPrice: 1,
                finalPrice: 1,
                orderId: 1,
                orderItemId: 1,
                originalPrice: 2,
                periodName: '3 months',
                quantity: 23,
                service: {
                    finalPrice: 1,
                    image: '',
                    numberOfSold: 20,
                    originalPrice: 1,
                    serviceId: 1,
                    titleName: '',
                },
                serviceId: 1,
            },
        ],
    };
    const [loading, setLoading] = useState<boolean>(false);

    const handleContinueShopping = () => {
        navigate(config.routes.public.shop);
    };

    return (
        <>
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
                        {true ? (
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
                                        {moment(data.date)
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
                                            alt="VNPAY"
                                        />
                                    </figure>
                                </St.ConfirmPaymentMethod>

                                <Divider />

                                <St.ConfirmCartList>
                                    <Title level={3}>Your order</Title>

                                    {/* <Table
                                        columns={CheckoutColumn()}
                                        dataSource={data}
                                        pagination={false}
                                        scroll={{ x: true }}
                                    /> */}
                                </St.ConfirmCartList>

                                <Divider />

                                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                    <St.PaymentSubPrice>
                                        <Title level={3}>Subtotal</Title>
                                        <Text>${data.subTotal}</Text>
                                    </St.PaymentSubPrice>

                                    <St.PaymentSubPrice>
                                        <Title level={3}>Discount</Title>
                                        <Text>${data.discountPrice}</Text>
                                    </St.PaymentSubPrice>
                                </Space>

                                <Divider />

                                <St.PaymentMainPrice>
                                    <Title level={3}>
                                        Total {data.listOrderItem.length} item(s)
                                    </Title>
                                    <Text>${data.finalPrice}</Text>
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
                    </St.ConfirmInner>
                </Container>
            </St.ConfirmSection>
        </>
    );
};

export default OrderSuccess;
