import { Col, List, Row, Typography, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@/components/Container';
import Link from '@/components/Link';
import { ServiceType } from '@/components/ServiceList/ServiceItem';
import config from '@/config';
import { getServiceTopSale } from '@/utils/serviceAPI';

import { aboutUs, pages, socials } from './Footer.data';
import * as Styled from './Footer.styled';

const { Title, Text } = Typography;

const Footer = () => {
    // Show toast
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });

    const navigate = useNavigate();
    const [services, setServices] = useState<ServiceType[]>([]);

    // Fetch API top sale services
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getServiceTopSale();
                setServices(data);
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
            }
        })();
    }, []);

    return (
        <>
            {contextHolder}

            <Styled.FooterSection>
                <Container>
                    <Row gutter={24}>
                        <Col lg={6} sm={12} xs={24}>
                            <Styled.FooterCTA>
                                <Title level={2}>Sẵn sàng bắt đầu chưa?</Title>
                                <Styled.FooterButton
                                    onClick={() => navigate(config.routes.public.shop)}
                                >
                                    Bắt đầu
                                </Styled.FooterButton>
                            </Styled.FooterCTA>
                        </Col>

                        <Col lg={8} sm={12} xs={24}>
                            <Styled.FooterColumnWrapper>
                                <Title level={3}>Dịch vụ</Title>

                                <List
                                    itemLayout="vertical"
                                    dataSource={services}
                                    renderItem={(service) => (
                                        <List.Item key={service.serviceId}>
                                            <Styled.FooterSocialsLink
                                                to={`${config.routes.public.shop}/${service.serviceId}`}
                                            >
                                                {service.titleName}
                                            </Styled.FooterSocialsLink>
                                        </List.Item>
                                    )}
                                />
                            </Styled.FooterColumnWrapper>
                        </Col>

                        <Col lg={4} sm={12} xs={24}>
                            <Styled.FooterColumnWrapper>
                                <Title level={3}>Trang</Title>

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

                        <Col lg={6} sm={12} xs={24}>
                            <Styled.FooterColumnWrapper>
                                <Title level={3}>Về HouseMate</Title>

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
                        <Col md={14} xs={24}>
                            <Styled.FooterCopyright>
                                <Text>
                                    Bản quyền © 2023. <Text strong>HouseMate</Text>. Hệ thống cung
                                    cấp dịch vụ cho căn hộ sinh viên.
                                </Text>
                            </Styled.FooterCopyright>
                        </Col>

                        <Col md={6} xs={24}>
                            <Styled.FooterSocials>
                                {socials.map((social) => {
                                    const Icon = social.icon;

                                    return (
                                        <Link
                                            key={social.key}
                                            to={social.to}
                                            aria-label={social.label}
                                        >
                                            {Icon && <Icon size={20} />}
                                        </Link>
                                    );
                                })}
                            </Styled.FooterSocials>
                        </Col>
                    </Styled.FooterRow>
                </Container>
            </Styled.FooterSection>
        </>
    );
};

export default Footer;
