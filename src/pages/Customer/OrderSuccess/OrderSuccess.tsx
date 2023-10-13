import { Divider, Space, Typography } from 'antd';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import vnpayLogo from '@/assets/svg/vnpay-logo.svg';
import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';
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

                        <Divider style={{ margin: '16px 0' }} />

                        <St.ConfirmTransaction>
                            <Title level={3}>Transaction date</Title>
                            <Text>Friday, October 13, 2023 (GMT +7)</Text>
                        </St.ConfirmTransaction>

                        <Divider style={{ margin: '16px 0' }} />

                        <St.ConfirmPaymentMethod>
                            <Title level={3}>Payment method</Title>

                            <figure>
                                <img src={vnpayLogo} loading="lazy" decoding="async" alt="VNPAY" />
                            </figure>
                        </St.ConfirmPaymentMethod>

                        <Divider style={{ margin: '16px 0' }} />

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

                        <Divider style={{ margin: '16px 0' }} />

                        <St.PaymentMainPrice>
                            <Title level={3}>Total (1 item)</Title>
                            <Text>$200,00</Text>
                        </St.PaymentMainPrice>
                    </St.ConfirmInner>
                </Container>
            </St.ConfirmSection>
        </>
    );
};

export default OrderSuccess;
