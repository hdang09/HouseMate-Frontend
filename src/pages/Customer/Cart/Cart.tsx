import { Button, Col, Divider, Row, Space, Table, Typography } from 'antd';

import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';

import { cartDummy } from './Cart.dummy';
import { CartType } from './Cart.type';
import * as St from './Cart.styled';
import CartColumn from './Cart.columns';

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
    const data: CartType[] = cartDummy.map((item) => ({
        key: item.id,
        id: item.id,
        service: {
            serviceId: item.service.serviceId,
            serviceImage: item.service.serviceImage,
            titleName: item.service.titleName,
        },
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price,
    }));

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: CartType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };

    const handleCheckout = () => {};

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

            <St.CartSection>
                <Container>
                    <Row>
                        <Col>
                            <St.CartTitle>
                                <Text>Cart</Text>
                                <Text>{cartDummy.length} item(s)</Text>
                            </St.CartTitle>
                        </Col>
                    </Row>

                    <Row gutter={[28, 28]}>
                        <Col xl={16} lg={16} sm={24} xs={24}>
                            <Table
                                rowSelection={{
                                    type: 'checkbox',
                                    ...rowSelection,
                                }}
                                columns={CartColumn()}
                                dataSource={data}
                                pagination={false}
                                scroll={{
                                    x: true,
                                }}
                            />
                        </Col>

                        <Col xl={8} lg={8} sm={24} xs={24} className="cart-service__total-wrapper">
                            <St.CartServiceCalPrice>
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
                                    <Title level={3}>Total (1 item)</Title>
                                    <Text>$200,00</Text>
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
