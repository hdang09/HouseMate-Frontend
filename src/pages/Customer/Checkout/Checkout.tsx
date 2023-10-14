import {
    Button,
    Col,
    Divider,
    Form,
    Radio,
    Row,
    Space,
    Table,
    Typography,
    RadioChangeEvent,
    notification,
} from 'antd';
import { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';

import vnpayLogo from '@/assets/svg/vnpay-logo.svg';
import { FormItem } from '@/components/AuthForm/AuthForm.styled';
import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';
import { theme } from '@/themes';

import { CheckoutType } from './Checkout.type';
import CheckoutColumn from './Checkout.columns';
import CheckoutFields from './Checkout.fields';
import * as St from './Checkout.styled';

const { Title, Text } = Typography;

const breadcrumbItems = [
    {
        title: <Link to={config.routes.public.home}>Home</Link>,
    },
    {
        title: <Link to={config.routes.customer.cart}>Cart</Link>,
    },
    {
        title: 'Checkout',
    },
];

const Checkout = () => {
    const [api, contextHolder] = notification.useNotification();
    const [payment, setPayment] = useState('vnpay');
    const [form] = Form.useForm();

    const data: CheckoutType[] = [];

    const handleChangePayment = (e: RadioChangeEvent) => {
        setPayment(e.target.value);
    };

    const handleOrderFailed = (values: any) => {
        if (payment !== 'vnpay' && payment !== 'paypal') {
            api['error']({
                message: 'Error',
                description: 'Please select a payment method.',
            });
        }

        values.errorFields.forEach((value: any) =>
            api['error']({
                message: 'Error',
                description: value.errors,
            }),
        );
    };

    const handleOrder = (values: any) => {
        if (payment !== 'vnpay' && payment !== 'paypal') return;
        console.log('values: ', values);
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

            <St.CheckoutSection>
                <Container>
                    <Row>
                        <Col>
                            <St.CheckoutTitle>
                                <Text>Order summary</Text>
                                <Text>3 item(s)</Text>
                            </St.CheckoutTitle>
                        </Col>
                    </Row>

                    <Row gutter={[30, 30]}>
                        <Col xl={14} sm={24} xs={24}>
                            <Table
                                columns={CheckoutColumn()}
                                dataSource={data}
                                pagination={false}
                                scroll={{ x: true }}
                            />
                        </Col>

                        <Col xl={10} sm={24} xs={24}>
                            <St.CheckoutCusInfo>
                                <Title level={3}>Customer information</Title>

                                <St.CheckoutForm
                                    form={form}
                                    onFinish={handleOrder}
                                    onFinishFailed={handleOrderFailed}
                                    layout="vertical"
                                    requiredMark={false}
                                    autoComplete="off"
                                >
                                    {CheckoutFields().map((field) => (
                                        <FormItem
                                            key={field.key}
                                            tooltip={
                                                field.initialValue && {
                                                    title: field.initialValue,
                                                    color: theme.colors.primary,
                                                    icon: (
                                                        <>
                                                            <BsInfoCircle
                                                                color={theme.colors.info}
                                                            />
                                                        </>
                                                    ),
                                                }
                                            }
                                            label={field.label}
                                            name={field.name}
                                            rules={field.rules}
                                            initialValue={field.initialValue}
                                        >
                                            {field.children}
                                        </FormItem>
                                    ))}
                                </St.CheckoutForm>
                            </St.CheckoutCusInfo>

                            <St.CheckoutPayment>
                                <Title level={3}>Payment method</Title>

                                <Radio.Group
                                    name="payment"
                                    value={payment}
                                    onChange={handleChangePayment}
                                >
                                    <Radio value="vnpay" style={{ visibility: 'hidden' }}>
                                        <St.CheckoutPaymentImgWrapper>
                                            <img
                                                src={vnpayLogo}
                                                loading="lazy"
                                                decoding="async"
                                                alt="VNPAY"
                                            />
                                        </St.CheckoutPaymentImgWrapper>
                                    </Radio>
                                </Radio.Group>
                            </St.CheckoutPayment>

                            <St.CheckoutTotalWrapper>
                                <Space>
                                    <Title level={3}>Subtotal</Title>
                                    <Text>$200,00</Text>
                                </Space>

                                <Space>
                                    <Title level={3}>Discount</Title>
                                    <Text>0</Text>
                                </Space>

                                <Divider />

                                <Space>
                                    <Title level={3}>Total {data.length} item(s)</Title>
                                    <Text>$200,00</Text>
                                </Space>

                                <Button
                                    block
                                    type="primary"
                                    size="large"
                                    htmlType="submit"
                                    onClick={() => form.submit()}
                                >
                                    Place order
                                </Button>
                            </St.CheckoutTotalWrapper>
                        </Col>
                    </Row>
                </Container>
            </St.CheckoutSection>
        </>
    );
};

export default Checkout;
