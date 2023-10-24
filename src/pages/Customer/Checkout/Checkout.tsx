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
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';

import vnpayLogo from '@/assets/svg/vnpay-logo.svg';
import { FormItem } from '@/components/AuthForm/AuthForm.styled';
import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';
import { theme } from '@/themes';
import { getCheckout } from '@/utils/checkoutAPI';
import { createPayment } from '@/utils/paymentAPI';

import { CheckoutType, OrderItemType, UserInfoType } from './Checkout.type';
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
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });
    const [form] = Form.useForm();

    const [loading, setLoading] = useState<boolean>(true);
    const [paymentMethod, setPaymentMethod] = useState('vnpay');
    const [checkout, setCheckout] = useState<CheckoutType>();

    const userInfo = useRef<UserInfoType>();

    // Call api to get cart list
    useEffect(() => {
        (async () => {
            try {
                const { data }: { data: CheckoutType } = await getCheckout();
                const orderList = data.listOrderItem.map((item: OrderItemType) => ({
                    ...item,
                    key: item.orderItemId,
                }));

                userInfo.current = data.user;

                setCheckout({ ...data, listOrderItem: orderList });
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

    const handleChangePayment = (e: RadioChangeEvent) => {
        setPaymentMethod(e.target.value);
    };

    const handleOrderFailed = (values: any) => {
        if (paymentMethod !== 'vnpay' && paymentMethod !== 'paypal') {
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

    const handleOrder = async (values: UserInfoType) => {
        // TODO: Call list payment method later...
        if (paymentMethod !== 'vnpay' && paymentMethod !== 'paypal') return;

        const order = {
            address: values.address,
            phone: values.phoneNumber,
            paymentMethod: paymentMethod,
        };

        try {
            setLoading(true);
            const { data } = await createPayment(order);

            // window.open(data, '_blank');
            window.location.href = data;
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.response ? error.response.data : error.message,
            });
        } finally {
            setLoading(false);
        }
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
                                <Text>{checkout?.listOrderItem.length || 0} item(s)</Text>
                            </St.CheckoutTitle>
                        </Col>
                    </Row>

                    <Row gutter={[30, 30]}>
                        <Col xl={checkout ? 14 : 24} sm={24} xs={24}>
                            <Table
                                columns={CheckoutColumn()}
                                loading={loading}
                                dataSource={checkout && checkout.listOrderItem}
                                pagination={false}
                                scroll={{ x: true }}
                            />
                        </Col>

                        <Col xl={10} sm={24} xs={24}>
                            {checkout && (
                                <>
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
                                            {userInfo.current &&
                                                CheckoutFields(userInfo.current).map((field) => (
                                                    <FormItem
                                                        key={field.key}
                                                        tooltip={
                                                            field.initialValue && {
                                                                title: field.initialValue,
                                                                color: theme.colors.primary,
                                                                icon: (
                                                                    <>
                                                                        <BsInfoCircle
                                                                            color={
                                                                                theme.colors.info
                                                                            }
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
                                            value={paymentMethod}
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
                                            <Text>{checkout?.subTotal.toLocaleString() || 0}đ</Text>
                                        </Space>

                                        <Space>
                                            <Title level={3}>Discount</Title>
                                            <Text>
                                                {checkout?.discountPrice.toLocaleString() || 0}đ
                                            </Text>
                                        </Space>

                                        <Divider />

                                        <Space>
                                            <Title level={3}>
                                                Total
                                                <Text>
                                                    {checkout && checkout.listOrderItem.length}
                                                </Text>
                                                item(s)
                                            </Title>
                                            <Text>
                                                {checkout?.finalPrice.toLocaleString() || 0}đ
                                            </Text>
                                        </Space>

                                        <Button
                                            block
                                            type="primary"
                                            size="large"
                                            htmlType="submit"
                                            onClick={() => form.submit()}
                                        >
                                            {loading ? (
                                                <Loading3QuartersOutlined
                                                    spin
                                                    style={{ fontSize: '1.6rem' }}
                                                />
                                            ) : (
                                                'Place order'
                                            )}
                                        </Button>
                                    </St.CheckoutTotalWrapper>
                                </>
                            )}
                        </Col>
                    </Row>
                </Container>
            </St.CheckoutSection>
        </>
    );
};

export default Checkout;
