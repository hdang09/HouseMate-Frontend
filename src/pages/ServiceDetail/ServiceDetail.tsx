import {
    Button,
    Divider,
    Image,
    InputNumber,
    Rate,
    Space,
    Tabs,
    Tooltip,
    Typography,
    Badge,
    Row,
    Col,
} from 'antd';
import type { TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import BannerBreadcrumb from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Link from '@/components/Link';
import { ServiceType } from '@/components/ServiceList/ServiceItem';
import { PeriodType } from '@/components/ServiceList/ServiceItem/ServiceItem.type';
import servicesDummy from '@/components/ServiceList/ServiceList.dummy';
import config from '@/config';
import shortenNumber from '@/utils/shortenNumber';

import Description from './Description';
import Feedback from './Feedback';
import Discussion from './Discussion';
import * as St from './ServiceDetail.styled';

const { Title, Text, Paragraph } = Typography;

const ServiceDetail = () => {
    const { serviceId } = useParams();

    // Store service from BE
    const [service, setService] = useState<ServiceType>();

    // Handle click list image
    const [image, setImage] = useState<string>();

    // Handle show price
    const [price, setPrice] = useState<number>();

    // Handle add type primary if button clicked
    const [buttonTypeId, setButtonTypeId] = useState<number>();

    // Handle update form (forgot use form antd)
    const [form, setForm] = useState<{ periodId: number; quantity: number }>({
        periodId: 0,
        quantity: 0,
    });

    // Handle logic error form field (forgot use form antd)
    const [error, setError] = useState({
        periodId: false,
        quantity: false,
    });

    useEffect(() => {
        (async () => {
            if (!serviceId) return;
            const data = servicesDummy[+serviceId - 1];
            setService(data);
            setImage(data.imageUrl[0]);
        })();
    }, [service]);

    const breadcrumbItems = [
        {
            title: <Link to={config.routes.public.home}>Home</Link>,
        },
        {
            title: <Link to={config.routes.public.shop}>Shop</Link>,
        },
        {
            title: service?.titleName,
        },
    ];

    const handlePeriod = (type: PeriodType) => {
        setButtonTypeId(type.id);
        setPrice(type.price);
        setForm((prevForm) => ({
            ...prevForm,
            periodId: type.id,
        }));
        setError((prevError) => ({ ...prevError, periodId: false }));
    };

    const handleImage = (image: string) => {
        setImage(image);
    };

    const handleQuantity = (value: number | null) => {
        setForm((prevForm) => ({
            ...prevForm,
            quantity: Number(value),
        }));
        setError((prevError) => ({ ...prevError, quantity: false }));
    };

    const handleAddToCart = () => {
        if (!form.periodId) setError((prevError) => ({ ...prevError, periodId: true }));
        if (!form.quantity) setError((prevError) => ({ ...prevError, quantity: true }));
        if (error.periodId || error.quantity) return;

        console.log(form);
    };

    // Item tabs
    const tabs: TabsProps['items'] = [
        {
            key: '1',
            label: 'The Detail',
            children: <Description desc={service?.description} />,
        },
        {
            key: '2',
            label: (
                <>
                    Rating & Review
                    <Badge count={service?.numberOfFeedback} />
                </>
            ),
            children: <Feedback />,
        },
        {
            key: '3',
            label: (
                <>
                    Discussion
                    <Badge count={service?.numberOfFeedback} />
                </>
            ),
            children: <Discussion />,
        },
    ];

    const breakpoints = {
        // when window width is >= 320px
        320: {
            slidesPerView: 3,
            spaceBetween: 14,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 3,
            spaceBetween: 14,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 4,
            spaceBetween: 14,
        },
    };

    return (
        <>
            <BannerBreadcrumb
                title={{
                    firstLine: ' Welcome to my',
                    secondLine: ['House', 'Mate'],
                    thirdLine: 'service shop!',
                }}
                breadcrumbItems={breadcrumbItems}
            />

            <St.ServiceDetailSection>
                <Container>
                    <Row
                        align="middle"
                        justify="center"
                        gutter={[
                            { xl: 90, sm: 0, xs: 0 },
                            { xl: 0, sm: 60, xs: 60 },
                        ]}
                    >
                        <Col xl={12} sm={24} xs={24}>
                            <St.ServiceDetailImageWrapper>
                                <Image src={image} alt={service?.titleName} />

                                <St.ServiceDetailImageList>
                                    <Swiper grabCursor breakpoints={breakpoints}>
                                        {service?.imageUrl.map((image, index) => (
                                            <SwiperSlide
                                                key={index}
                                                onClick={() => handleImage(image)}
                                            >
                                                <Image
                                                    src={image}
                                                    alt={service.titleName}
                                                    width="100%"
                                                    height="100%"
                                                    preview={false}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </St.ServiceDetailImageList>
                            </St.ServiceDetailImageWrapper>
                        </Col>

                        <Col xl={12} sm={24} xs={24}>
                            <St.ServiceDetailContent>
                                <Title level={2}>{service?.titleName}</Title>

                                <St.ServiceDetailReviewWrapper>
                                    <Space size={16} align="center">
                                        <Rate count={5} defaultValue={5} allowHalf disabled />
                                        <Text>{service?.avgRating.toFixed(1)}</Text>
                                    </Space>

                                    <Divider type="vertical" />

                                    <Paragraph>
                                        <Text>{shortenNumber(service?.numberOfSold)}</Text>
                                        <Text>Sold</Text>
                                    </Paragraph>

                                    <Divider type="vertical" />

                                    <Paragraph>
                                        <Text>{shortenNumber(service?.numberOfFeedback)}</Text>
                                        <Text>Feedback</Text>
                                    </Paragraph>
                                </St.ServiceDetailReviewWrapper>

                                <St.ServiceDetailPrice>
                                    {price ? (
                                        <Text>${price}</Text>
                                    ) : (
                                        <>
                                            <Text>${service?.period[0].price}</Text>
                                            <Text> - </Text>
                                            <Text>
                                                ${service?.period[service.period.length - 1].price}
                                            </Text>
                                        </>
                                    )}
                                </St.ServiceDetailPrice>

                                <Divider />

                                <St.ServiceDetailPeriod>
                                    <Paragraph>Available Period</Paragraph>

                                    <Space wrap size={24}>
                                        {service?.period.map((type) => (
                                            <St.ServiceDetailPeriodCta
                                                key={type.id}
                                                type={
                                                    type.id === buttonTypeId ? 'primary' : 'default'
                                                }
                                                onClick={() => handlePeriod(type)}
                                                danger={error.periodId}
                                            >
                                                {type.value}
                                            </St.ServiceDetailPeriodCta>
                                        ))}
                                    </Space>
                                </St.ServiceDetailPeriod>

                                <St.ServiceDetailQuantity>
                                    <Paragraph>Quantity</Paragraph>
                                    <Tooltip placement="right" title="Max 3 items">
                                        <InputNumber
                                            min={1}
                                            max={3}
                                            defaultValue={1}
                                            status={error.quantity ? 'error' : ''}
                                            onChange={handleQuantity}
                                        />
                                    </Tooltip>
                                </St.ServiceDetailQuantity>

                                <Divider />

                                <St.ServiceDetailText>
                                    A home service package offers homeowners peace of mind by
                                    providing a one-stop solution for home management. It simplifies
                                    maintenance, saves time, and ensures a comfortable and
                                    well-maintained home for your family.
                                </St.ServiceDetailText>

                                <St.ServiceDetailButtonWrapper>
                                    <Button type="primary" onClick={handleAddToCart}>
                                        Add to card
                                    </Button>
                                    <Button type="link">Checkout</Button>
                                </St.ServiceDetailButtonWrapper>
                            </St.ServiceDetailContent>
                        </Col>
                    </Row>
                </Container>
            </St.ServiceDetailSection>

            <St.ServiceDetailTabs>
                <Container>
                    <Tabs
                        centered
                        size="large"
                        tabBarGutter={230}
                        defaultActiveKey="1"
                        items={tabs}
                    />
                </Container>
            </St.ServiceDetailTabs>
        </>
    );
};

export default ServiceDetail;
