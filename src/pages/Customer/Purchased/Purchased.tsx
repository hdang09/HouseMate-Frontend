import { Col, Row } from 'antd';
import Container from '@/components/Container';
import { PurchasedSection } from './Purchased.styled';
import PurchasedList from '@/components/PurchasedList';
import services from './Purchased.dummy';

const Purchased = () => {
    return (
        <PurchasedSection>
            <Container>
                <Row gutter={50}>
                    <Col span={6}></Col>
                    <Col span={18}>
                        <PurchasedList services={services} />
                    </Col>
                </Row>
            </Container>
        </PurchasedSection>
    );
};

export default Purchased;
