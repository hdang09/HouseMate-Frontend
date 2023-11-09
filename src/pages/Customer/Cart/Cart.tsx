import { Button, Col, Divider, Flex, Row, Space, Table, Typography, notification } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';
import { useAppDispatch, useAppSelector, useDocumentTitle } from '@/hooks';
import { serviceSlice } from '@/pages/ServiceDetail/slice';
import { getCart } from '@/utils/cartAPI';
import { createCheckout } from '@/utils/checkoutAPI';

import { CartDataType, CartType } from './Cart.type';
import CartColumn from './Cart.columns';
import * as St from './Cart.styled';

const { Title, Text } = Typography;

const breadcrumbItems = [
    {
        title: <Link to={config.routes.public.home}>Trang Chủ</Link>,
    },
    {
        title: 'Giỏ Hàng',
    },
];

const Cart = () => {
    useDocumentTitle('Giỏ Hàng | HouseMate');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const serviceId = useAppSelector((state) => state.service.serviceId);

    // Show toast
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });

    // Checkout list item checkbox
    const rowKeys = useRef<React.Key[]>([serviceId]);
    const checkboxList = useRef<React.Key[]>([]);

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
                const { data }: { data: CartType[] } = await getCart();

                rowSelection.onChange(
                    rowKeys.current,
                    data.filter((item: CartType) => rowKeys.current.includes(item.serviceId)),
                );

                setCart(data.map((item: CartType) => ({ ...item, key: item.serviceId })));
            } catch (error: any) {
                api.error({
                    message: 'Lỗi',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                dispatch(serviceSlice.actions.setServiceId(0));
                setLoading(false);
            }
        })();
    }, [reload]);

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: CartType[]) => {
            rowKeys.current = [...selectedRowKeys];
            checkboxList.current = [...selectedRows.map((row) => row.cartId)];
            setCartData({
                subTotal: selectedRows.reduce(
                    (total, product) => total + product.originalPrice * product.quantity,
                    0,
                ),
                total: selectedRows.reduce(
                    (total, product) => total + product.finalPrice * product.quantity,
                    0,
                ),
            });
        },
    };

    const handleCheckout = async () => {
        if (checkboxList.current.length <= 0) {
            api.warning({
                message: 'Cảnh Báo',
                description: 'Xin vui lòng chọn ít nhất 1 dịch vụ để thanh toán!',
            });

            return;
        }

        try {
            setLoading(true);
            await createCheckout({ listCartId: checkboxList.current as number[] });
            navigate(config.routes.customer.checkout);
        } catch (error: any) {
            api.error({
                message: 'Lỗi',
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

            <St.CartSection>
                <Container>
                    <Row>
                        <Col>
                            <St.CartTitle>
                                <Text>Giỏ Hàng</Text>
                                <Text>({cart.length} dịch vụ)</Text>
                            </St.CartTitle>
                        </Col>
                    </Row>

                    <Row gutter={[28, 28]}>
                        <Col xl={16} lg={16} sm={24} xs={24}>
                            <Table
                                rowSelection={{
                                    type: 'checkbox',
                                    defaultSelectedRowKeys: rowKeys.current,
                                    ...rowSelection,
                                }}
                                columns={CartColumn(api, rowKeys, setReload)}
                                loading={loading}
                                dataSource={cart}
                                pagination={false}
                                scroll={{
                                    x: cart.length > 0 ? true : undefined,
                                }}
                            />
                        </Col>

                        <Col xl={8} lg={8} sm={24} xs={24} className="cart-service__total-wrapper">
                            <St.CartServiceCalPrice>
                                <Space>
                                    <Title level={3}>Tổng tiền hàng</Title>
                                    <Text>{cartData.subTotal.toLocaleString()}đ</Text>
                                </Space>

                                <Space>
                                    <Title level={3}>Tiết kiệm</Title>
                                    <Text>
                                        {(cartData.subTotal - cartData.total).toLocaleString()}đ
                                    </Text>
                                </Space>

                                <Divider />

                                <Flex wrap="wrap" justify="space-between">
                                    <Title level={3}>
                                        Tổng thanh toán ({checkboxList.current.length} dịch vụ)
                                    </Title>
                                    <Text>{cartData.total.toLocaleString()}đ</Text>
                                </Flex>

                                <Button block type="primary" size="large" onClick={handleCheckout}>
                                    {loading ? (
                                        <Loading3QuartersOutlined
                                            spin
                                            style={{ fontSize: '1.6rem' }}
                                        />
                                    ) : (
                                        'Mua hàng'
                                    )}
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
