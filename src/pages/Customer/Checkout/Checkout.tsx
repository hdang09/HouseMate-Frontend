import { Button, Col, Divider, Form, Row, Space, Table, Typography, message } from 'antd';

import vnpayLogo from '@/assets/svg/vnpay-logo.svg';
import { FormItem } from '@/components/AuthForm/AuthForm.styled';
import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';

import { CheckoutType } from './Checkout.type';
import { checkoutDummy } from './Checkout.dummy';
import CheckoutColumn from './Checkout.column';
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
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

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

    const handleOrderFailed = (values: any) => {
        values.errorFields.forEach((value: any) => messageApi.error(value.errors));
    };

    const handleOrder = (values: any) => {
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
                        <Col xl={14}>
                            <Table
                                columns={CheckoutColumn()}
                                dataSource={data}
                                pagination={false}
                                scroll={{ x: true }}
                            />
                        </Col>

                        <Col xl={10}>
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
                                            label={field.label}
                                            name={field.name}
                                            rules={field.rules}
                                            style={{ width: 'calc(50% - 8px)', margin: 0 }}
                                            initialValue={field.initialValue}
                                        >
                                            {field.children}
                                        </FormItem>
                                    ))}
                                </St.CheckoutForm>
                            </St.CheckoutCusInfo>

                            <St.CheckoutPayment>
                                <Title level={3}>Payment method</Title>

                                <St.CheckoutPaymentImgWrapper>
                                    <img
                                        src={vnpayLogo}
                                        loading="lazy"
                                        decoding="async"
                                        alt="VNPAY"
                                    />
                                </St.CheckoutPaymentImgWrapper>
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
