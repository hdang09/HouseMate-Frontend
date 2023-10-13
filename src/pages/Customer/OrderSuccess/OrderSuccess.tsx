import { Button, Divider, Space, Table, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import vnpayLogo from '@/assets/svg/vnpay-logo.svg';
import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';
import { CheckoutType } from '@/pages/Customer/Checkout/Checkout.type';
import { checkoutDummy } from '@/pages/Customer/Checkout/Checkout.dummy';
import CheckoutColumn from '@/pages/Customer/Checkout/Checkout.columns';
import { theme } from '@/themes';

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
    const navigate = useNavigate();

    const data: CheckoutType[] = checkoutDummy.map((item) => ({
        key: item.id,
        id: item.id,
        service: {
            serviceId: item.service.serviceId,
            serviceImage: item.service.serviceImage,
            serviceName: item.service.serviceName,
        },
        variant: {
            variantId: item.variant.variantId,
            variantName: item.variant.variantName,
        },
        quantity: item.quantity,
        price: item.price,
    }));

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
                        <St.ConfirmSuccessMsg>
                            <AiOutlineCheckCircle size={80} color={theme.colors.success} />
                            <Title level={2}>Thank for your order !</Title>
                            <Text>
                                Please check the
                                <Link to={config.routes.customer.purchased} underline scroll>
                                    <Text>My</Text>
                                    <Text>Purchased</Text>
                                </Link>
                                page to use our service.
                            </Text>
                        </St.ConfirmSuccessMsg>

                        <Divider />

                        <St.ConfirmTransaction>
                            <Title level={3}>Transaction date</Title>
                            <Text>Friday, October 13, 2023 (GMT +7)</Text>
                        </St.ConfirmTransaction>

                        <Divider />

                        <St.ConfirmPaymentMethod>
                            <Title level={3}>Payment method</Title>

                            <figure>
                                <img src={vnpayLogo} loading="lazy" decoding="async" alt="VNPAY" />
                            </figure>
                        </St.ConfirmPaymentMethod>

                        <Divider />

                        <St.ConfirmCartList>
                            <Title level={3}>Your order</Title>

                            <Table
                                columns={CheckoutColumn()}
                                dataSource={data}
                                pagination={false}
                                scroll={{ x: true }}
                            />
                        </St.ConfirmCartList>

                        <Divider />

                        <Space direction="vertical" size={16} style={{ width: '100%' }}>
                            <St.PaymentSubPrice>
                                <Title level={3}>Subtotal</Title>
                                <Text>$200,00</Text>
                            </St.PaymentSubPrice>

                            <St.PaymentSubPrice>
                                <Title level={3}>Discount</Title>
                                <Text>$0</Text>
                            </St.PaymentSubPrice>
                        </Space>

                        <Divider />

                        <St.PaymentMainPrice>
                            <Title level={3}>Total {data.length} item(s)</Title>
                            <Text>$200,00</Text>
                        </St.PaymentMainPrice>

                        <Button block type="primary" size="large" onClick={handleContinueShopping}>
                            Continue shopping
                        </Button>
                    </St.ConfirmInner>
                </Container>
            </St.ConfirmSection>
        </>
    );
};

export default OrderSuccess;
