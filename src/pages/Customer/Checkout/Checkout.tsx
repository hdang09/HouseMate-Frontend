import { Col, Row, Typography } from 'antd';

import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Link from '@/components/Link';
import config from '@/config';

import * as St from './Checkout.styled';
import Container from '@/components/Container';

const { Text } = Typography;

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
                </Container>
            </St.CheckoutSection>
        </>
    );
};

export default Checkout;
