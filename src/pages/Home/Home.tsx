import * as Styled from './Home.styled';

import { Carousel, Col, Rate, Row, Typography, notification } from 'antd';
import { useEffect, useState } from 'react';

import Container from '@/components/Container';
import DefaultBanner from '@/components/Banner/DefaultBanner';
import { IoIosArrowForward } from 'react-icons/io';
import Link from '@/components/Link';
import { ServiceType } from '@/components/ServiceList/ServiceItem';
import config from '@/config';
import fallbackImg from '@/assets/images/fallback-img.png';
import feedbackImg from '@/assets/images/feedback-img.webp';
import { theme } from '@/themes';
import { getServiceTopSale } from '@/utils/serviceAPI';
import { FeedbackListItem } from '@/pages/ServiceDetail/Feedback/Feedback.type';
import { getTopFeedback } from '@/utils/feedbackAPI';

const { Text, Paragraph } = Typography;

const Home = () => {
    // Show toast
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [services, setServices] = useState<ServiceType[]>([]);
    const [feedbacks, setFeedbacks] = useState<FeedbackListItem[]>([]);

    // Number of items for responsive
    const grid = {
        gutter: [30, 30],
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 4,
    };

    // Fetch API top sale services
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await getServiceTopSale();
                setServices(data);
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

    // Fetch API top feedback services
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const { data } = await getTopFeedback({ rating: 5 });
                setFeedbacks(data);
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

    return (
        <>
            {contextHolder}

            <DefaultBanner />

            <Styled.BestServiceSection>
                <Container>
                    <Row justify="space-between">
                        <Col lg={12}>
                            <Styled.BestServiceTitle level={2}>
                                Our Best Service
                            </Styled.BestServiceTitle>

                            <Styled.BestServiceDesc>
                                Welcome to a world of unparalleled home service, where we bring
                                expertise, reliability, and innovation right to your doorstep,
                                ensuring your home shines with brilliance.
                            </Styled.BestServiceDesc>
                        </Col>

                        <Col lg={5}>
                            <Link to={config.routes.public.shop}>
                                <Styled.BestServiceButton type="primary">
                                    <Text>See all service</Text>
                                    <IoIosArrowForward size={24} color={theme.colors.white} />
                                </Styled.BestServiceButton>
                            </Link>
                        </Col>
                    </Row>

                    <Styled.BestServiceList
                        loading={loading}
                        pageSize={0}
                        services={services}
                        grid={grid}
                        cardWidth={270}
                    />
                </Container>
            </Styled.BestServiceSection>

            <Styled.FeedbackSection>
                <Container>
                    <Row align="middle" gutter={24}>
                        <Col lg={12} md={24} sm={24} xs={24}>
                            <Styled.FeedbackImageWrapper>
                                <Styled.FeedbackImage
                                    src={feedbackImg}
                                    alt="Feedback"
                                    fallback={fallbackImg}
                                    preview={false}
                                    width={570}
                                    height={570}
                                />
                            </Styled.FeedbackImageWrapper>
                        </Col>

                        <Col lg={12} md={24} sm={24} xs={24}>
                            <Styled.FeedbackTitle level={2}>
                                What our member say
                            </Styled.FeedbackTitle>

                            <Carousel autoplay dots={false}>
                                {feedbacks.map((feedback) => (
                                    <Styled.FeedbackContent key={feedback.serviceFeedbackId}>
                                        <Styled.FeedbackDesc italic>
                                            “{feedback.content}
                                        </Styled.FeedbackDesc>

                                        <Styled.FeedbackUser>
                                            <Styled.FeedbackUserImage
                                                src={
                                                    feedback.avatar && feedback.avatar.length > 0
                                                        ? feedback.avatar[0].imageUrl
                                                        : ''
                                                }
                                                alt={feedback.customerName}
                                                width={80}
                                                height={80}
                                            />

                                            <Styled.FeedbackUserInfo>
                                                <Paragraph>{feedback.customerName}</Paragraph>
                                                <Text>Variation: {feedback.serviceName}</Text>
                                                <Rate value={feedback.rating} count={5} disabled />
                                            </Styled.FeedbackUserInfo>
                                        </Styled.FeedbackUser>
                                    </Styled.FeedbackContent>
                                ))}
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </Styled.FeedbackSection>
        </>
    );
};

export default Home;
