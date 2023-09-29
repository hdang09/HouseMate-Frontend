import { Carousel, Col, Rate, Row, Typography } from 'antd';
import { IoIosArrowForward } from 'react-icons/io';

import fallbackImg from '@/assets/images/fallback-img.png';
import feedbackImg from '@/assets/images/feedback-img.png';
import DefaultBanner from '@/components/Banner/DefaultBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';
import { theme } from '@/themes';

import { feedbacks } from './Home.feedback';
import * as Styled from './Home.styled';

const { Text, Paragraph } = Typography;

const Home = () => {
    return (
        <>
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

                        <Col lg={6}>
                            <Link to={config.routes.shop}>
                                <Styled.BestServiceButton type="primary">
                                    <Text>See all service</Text>
                                    <IoIosArrowForward size={24} color={theme.colors.white} />
                                </Styled.BestServiceButton>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </Styled.BestServiceSection>

            <Styled.FeedbackSection>
                <Container>
                    <Row align="middle" gutter={24}>
                        <Col lg={12} md={24} sm={24} xs={24}>
                            <Styled.FeedbackImage
                                src={feedbackImg}
                                alt="Feedback"
                                fallback={fallbackImg}
                                preview={false}
                            />
                        </Col>

                        <Col lg={12} md={24} sm={24} xs={24}>
                            <Styled.FeedbackTitle level={2}>
                                What our member say
                            </Styled.FeedbackTitle>

                            <Carousel autoplay dots={false}>
                                {feedbacks.map((feedback) => (
                                    <Styled.FeedbackContent key={feedback.key}>
                                        <Styled.FeedbackDesc italic>
                                            “{feedback.description}
                                        </Styled.FeedbackDesc>

                                        <Styled.FeedbackUser>
                                            <Styled.FeedbackUserImage
                                                src={feedback.image}
                                                alt={feedback.username}
                                                width={80}
                                                height={80}
                                            />

                                            <Styled.FeedbackUserInfo>
                                                <Paragraph>{feedback.username}</Paragraph>
                                                <Text>Variation: {feedback.variation}</Text>
                                                <Rate defaultValue={feedback.star} disabled />
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
