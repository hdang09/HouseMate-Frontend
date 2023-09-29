import { Col, List, Row, Typography } from 'antd';

import Container from '@/components/Container';
import Link from '@/components/Link';

import * as Styled from './Footer.styled';
import { aboutUs, pages, services, socials } from './Footer.data';

const { Title, Text } = Typography;

const Footer = () => {
    return (
        <Styled.FooterSection>
            <Container>
                <Row gutter={[0, 24]}>
                    <Col lg={7} md={12} sm={12} xs={24}>
                        <Styled.FooterCTA>
                            <Title level={2}>Ready to get started?</Title>
                            <Styled.FooterButton>Get started</Styled.FooterButton>
                        </Styled.FooterCTA>
                    </Col>

                    <Col lg={5} md={12} sm={12} xs={24}>
                        <Styled.FooterColumnWrapper>
                            <Title level={3}>Services</Title>

                            <List
                                itemLayout="vertical"
                                dataSource={services}
                                renderItem={(service) => (
                                    <List.Item key={service.key}>
                                        <Link to={service.to}>{service.title}</Link>
                                    </List.Item>
                                )}
                            />
                        </Styled.FooterColumnWrapper>
                    </Col>

                    <Col lg={5} md={12} sm={12} xs={24}>
                        <Styled.FooterColumnWrapper>
                            <Title level={3}>Pages</Title>

                            <List
                                itemLayout="vertical"
                                dataSource={pages}
                                renderItem={(page) => (
                                    <List.Item key={page.key}>
                                        <Link to={page.to}>{page.title}</Link>
                                    </List.Item>
                                )}
                            />
                        </Styled.FooterColumnWrapper>
                    </Col>

                    <Col lg={7} md={12} sm={12} xs={24}>
                        <Styled.FooterColumnWrapper>
                            <Title level={3}>About Us</Title>

                            <List
                                itemLayout="vertical"
                                dataSource={aboutUs}
                                renderItem={(about) => (
                                    <List.Item key={about.key}>
                                        <Link to={about.to} target={about.target}>
                                            {about.title}
                                        </Link>
                                    </List.Item>
                                )}
                            />
                        </Styled.FooterColumnWrapper>
                    </Col>
                </Row>

                <Styled.FooterRow align="middle" justify={'space-between'}>
                    <Col md={12} xs={24}>
                        <Styled.FooterCopyright>
                            <Text>
                                Copyright © 2023. <Text strong>HouseMate</Text>. All rights
                                reserved.
                            </Text>
                        </Styled.FooterCopyright>
                    </Col>

                    <Col md={12} xs={24}>
                        <Styled.FooterSocials>
                            {socials.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <Link key={social.key} to={social.to}>
                                        {Icon && <Icon size={20} />}
                                    </Link>
                                );
                            })}
                        </Styled.FooterSocials>
                    </Col>
                </Styled.FooterRow>
            </Container>
        </Styled.FooterSection>
    );
};

export default Footer;
