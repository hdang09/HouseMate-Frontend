import { Col, List, Row, Typography } from 'antd';

import Container from '@/components/Container';

import * as Styled from './Footer.styled';

const { Title } = Typography;

const Footer = () => {
    return (
        <Styled.FooterSection>
            <Container>
                <Row>
                    <Col span={6}>
                        <Styled.FooterCTA>
                            <Title level={2}>Ready to get started?</Title>
                            <Styled.FooterButton>Get started</Styled.FooterButton>
                        </Styled.FooterCTA>
                    </Col>

                    <Col span={6}>
                        <Styled.FooterColumnWrapper>
                            <Title level={3}>Services</Title>

                            <List />
                        </Styled.FooterColumnWrapper>
                    </Col>
                </Row>
            </Container>
        </Styled.FooterSection>
    );
};

export default Footer;
