import { Button, Col, Divider, Row, Skeleton, Space, Table, Typography, notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';
import { getCart } from '@/utils/cartAPI';

import { CartDataType, CartType } from './Cart.type';
import * as St from './Cart.styled';
import CartColumn from './Cart.columns';
import { createCheckout } from '@/utils/checkoutAPI';

const { Title, Text } = Typography;

const breadcrumbItems = [
    {
        title: <Link to={config.routes.public.home}>Home</Link>,
    },
    {
        title: 'Cart',
    },
];

const Cart = () => {
    const navigate = useNavigate();

    // Show toast
    const [api, contextHolder] = notification.useNotification();

    // Checkout list item checkbox
    const rowKeys = useRef<React.Key[]>([]);

    const [cart, setCart] = useState<CartType[]>([]);
    const [cartData, setCartData] = useState<CartDataType>({
        subTotal: 0,
        total: 0,
    });

    const [reload, setReload] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    // Call api to get cart list
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getCart();
                setCart(data.map((item: CartType) => ({ ...item, key: item.cartId })));
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [reload]);

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: CartType[]) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            rowKeys.current = [...selectedRowKeys];
            setCartData((prevCartData) => ({
                ...prevCartData,
                subTotal: selectedRows.reduce(
                    (total, product) => total + product.service.originalPrice,
                    0,
                ),
                total: selectedRows.reduce((total, product) => total + product.price, 0),
            }));
        },
    };

    const handleCheckout = async () => {
        if (rowKeys.current.length <= 0) {
            api.warning({
                message: 'Warning',
                description: 'You have not selected any items for checkout',
            });

            return;
        }

        try {
            await createCheckout({ listCartId: rowKeys.current as number[] });
            navigate(config.routes.customer.checkout);
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.response ? error.response.data : error.message,
            });
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

            <St.CartSection>
                <Container>
                    <Row>
                        <Col>
                            <St.CartTitle>
                                <Text>Cart</Text>
                                <Text>{cart.length} item(s)</Text>
                            </St.CartTitle>
                        </Col>
                    </Row>

                    <Row gutter={[28, 28]}>
                        <Col xl={16} lg={16} sm={24} xs={24}>
                            <Skeleton loading={loading}>
                                <Table
                                    rowSelection={{
                                        type: 'checkbox',
                                        defaultSelectedRowKeys: rowKeys.current,
                                        ...rowSelection,
                                    }}
                                    columns={CartColumn(api, setReload)}
                                    dataSource={cart}
                                    pagination={false}
                                    scroll={{
                                        x: cart.length > 0 ? true : undefined,
                                    }}
                                />
                            </Skeleton>
                        </Col>

                        <Col xl={8} lg={8} sm={24} xs={24} className="cart-service__total-wrapper">
                            <St.CartServiceCalPrice>
                                <Space>
                                    <Title level={3}>Subtotal</Title>
                                    <Text>${cartData.subTotal}</Text>
                                </Space>

                                <Space>
                                    <Title level={3}>Discount</Title>
                                    <Text>${cartData.subTotal - cartData.total}</Text>
                                </Space>

                                <Divider />

                                <Space>
                                    <Title level={3}>Total {rowKeys.current.length} item(s)</Title>
                                    <Text>${cartData.total}</Text>
                                </Space>

                                <Button block type="primary" size="large" onClick={handleCheckout}>
                                    Checkout now
                                </Button>
                            </St.CartServiceCalPrice>
                        </Col>
                    </Row>
                </Container>
            </St.CartSection>
        </>
    );
};

export default Cart;
