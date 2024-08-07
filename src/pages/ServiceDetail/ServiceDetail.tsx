import {
    Badge,
    Button,
    Col,
    Divider,
    Flex,
    Image,
    InputNumber,
    Rate,
    Row,
    Skeleton,
    Space,
    Tabs,
    Tag,
    Tooltip,
    Typography,
    notification,
} from 'antd';
import type { TabsProps } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

import fallbackImage from '@/assets/images/fallback-img.png';
import BreadcrumbBanner from '@/components/Banner/BreadcrumbBanner';
import Container from '@/components/Container';
import Description from './Description';
import Discussion from './Discussion';
import Feedback from './Feedback';
import Link from '@/components/Link';
import ServiceList from '@/components/ServiceList';
import { ServiceType } from '@/components/ServiceList/ServiceItem';
import config from '@/config';
import { useAppDispatch, useAppSelector, useAuth, useDocumentTitle } from '@/hooks';
import { ShopType } from '@/pages/Shop/Shop.type';
import shortenNumber from '@/utils/shortenNumber';
import { addToCart } from '@/utils/cartAPI';
import { getServiceById, getSimilarService } from '@/utils/serviceAPI';
import { Category, Role } from '@/utils/enums';
import { cartSlice } from '@/layouts/MainLayout/slice';

import { ImageType, PriceListType, ServiceDetailType } from './ServiceDetail.type';
import { serviceSlice } from './slice';
import * as St from './ServiceDetail.styled';
import { theme } from '@/themes';

const { Title, Text, Paragraph } = Typography;

interface FormState {
    periodId: number;
    quantity: number;
}

// Number of items for responsive
const grid = {
    gutter: [30, 30],
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
};

// Breakpoints for Swiper
const breakpoints = {
    // when window width is >= 320px
    320: {
        slidesPerView: 3,
        spaceBetween: 10,
    },
    // when window width is >= 480px
    480: {
        slidesPerView: 4,
        spaceBetween: 10,
    },
    // when window width is >= 640px
    640: {
        slidesPerView: 5,
        spaceBetween: 10,
    },
};

const ServiceDetail = () => {
    const { role } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const commentLength = useAppSelector((state) => state.service.commentLength);
    const { serviceId } = useParams();

    // Show toast
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });

    // Loading
    const [loading, setLoading] = useState<boolean>(false);
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [buyLoading, setBuyLoading] = useState<boolean>(false);

    // Store service from BE
    const [service, setService] = useState<ServiceDetailType>();

    // Store similar service
    const [services, setServices] = useState<ServiceType[]>([]);

    // Handle click list image
    const [image, setImage] = useState<string>();

    // Handle add type primary if button period clicked
    const [buttonType, setButtonType] = useState<PriceListType>();

    // Handle update form (forgot use form antd)
    const [form, setForm] = useState<FormState>({
        periodId: 0,
        quantity: 1,
    });

    // Handle logic error form field (forgot use form antd)
    const [error, setError] = useState({
        periodId: false,
        quantity: false,
    });

    useDocumentTitle(
        `${service ? `Dịch Vụ | ${service.service.titleName} | HouseMate` : `Đang Tải...`}`,
    );

    // Clear number of comments when access page
    useEffect(() => {
        dispatch(serviceSlice.actions.setCommentLength(0));
    }, []);

    // Get service by id
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (!serviceId) return;

                const { data: serviceDetail }: { data: ServiceDetailType } = await getServiceById(
                    +serviceId,
                );
                const { data: similarList }: { data: ShopType } = await getSimilarService(
                    serviceDetail.service.package
                        ? Category.PACKAGE_SERVICE_UPPER
                        : Category.SINGLE_SERVICE_UPPER,
                );

                setService({
                    ...serviceDetail,
                    priceList: serviceDetail.priceList.sort(
                        (a, b) => a.periodValue - b.periodValue,
                    ),
                });
                setServices(
                    similarList.content.filter((item) => item.serviceId !== +serviceId).slice(0, 4),
                );
                setImage(serviceDetail.service.images[0].imageUrl);
                dispatch(
                    serviceSlice.actions.setCommentLength(serviceDetail.service.numberOfComment),
                );
            } catch (error: any) {
                api.error({
                    message: 'Lỗi',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [serviceId]);

    const handlePeriod = (type: PriceListType) => {
        setButtonType(type);
        setForm((prevForm) => ({
            ...prevForm,
            periodId: type.periodId,
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

    const handleCartAtServiceDetail = async (
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        if (role !== Role.CUSTOMER) return navigate(config.routes.public.login);

        if (!form.periodId) {
            api.error({ message: 'Lỗi', description: 'Please select the period!' });
            setError((prevError) => ({ ...prevError, periodId: true }));
        }

        if (!form.quantity) {
            api.error({ message: 'Lỗi', description: 'Please select the valid quantity!' });
            setError((prevError) => ({ ...prevError, quantity: true }));
        }

        if (form.periodId <= 0 || form.quantity <= 0) return;
        if (error.periodId || error.quantity) return;
        if (!serviceId || addLoading) return;

        try {
            setLoading(true);

            const service = {
                serviceId: +serviceId,
                quantity: form.quantity,
                periodId: form.periodId,
            };

            const { data } = await addToCart(service);
            dispatch(cartSlice.actions.setLength(data));

            api.success({ message: 'Thành Công', description: 'Đã thêm vào giỏ hàng!' });

            return true;
        } catch (error: any) {
            api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        handleCartAtServiceDetail(setAddLoading);
    };

    const handleBuyNow = async () => {
        if (!serviceId) return;
        const isValid = await handleCartAtServiceDetail(setBuyLoading);

        if (isValid) {
            dispatch(serviceSlice.actions.setServiceId(+serviceId));
            navigate(config.routes.customer.cart);
        }
    };

    const handleSeeAllSimilar = () => {
        dispatch(
            serviceSlice.actions.setCategory(
                service?.service.package
                    ? Category.PACKAGE_SERVICE_UPPER
                    : Category.SINGLE_SERVICE_UPPER,
            ),
        );
        navigate(config.routes.public.shop);
    };

    // Breadcrumb items
    const breadcrumbItems = [
        {
            title: <Link to={config.routes.public.home}>Trang Chủ</Link>,
        },
        {
            title: <Link to={config.routes.public.shop}>Cửa Hàng</Link>,
        },
        {
            title: service?.service.titleName,
        },
    ];

    // Item tabs
    const tabs: TabsProps['items'] = [
        {
            key: '1',
            label: 'Mô Tả',
            children: (
                <Description
                    title={service?.service.titleName || ''}
                    desc={service?.service.description || ''}
                    typeList={service?.typeList || []}
                    packageListItem={service?.packageServiceItemList || []}
                />
            ),
        },
        {
            key: '2',
            label: (
                <>
                    Xếp Hạng & Đánh Giá
                    <Badge count={service?.service.numberOfReview} />
                </>
            ),
            children: <Feedback />,
        },
        {
            key: '3',
            label: (
                <>
                    Thảo Luận
                    <Badge count={commentLength} />
                </>
            ),
            children: <Discussion />,
        },
    ];

    const getPackageListImage = () => {
        if (!service?.service.images || !service.packageServiceItemList) return [];

        let list: ImageType[] = [];

        service.service.images.forEach((image) => {
            list.push(image);
        });

        service.packageServiceItemList.forEach((item) => {
            item.images.forEach((image) => {
                list.push(image);
            });
        });

        return list;
    };

    const renderPackageImageList = () => {
        const list = getPackageListImage();

        return list.map((item) => (
            <SwiperSlide key={item.imageId} onClick={() => handleImage(item.imageUrl)}>
                <figure>
                    <Image
                        src={item.imageUrl}
                        alt={service?.service.titleName}
                        preview={false}
                        fallback={fallbackImage}
                    />
                </figure>
            </SwiperSlide>
        ));
    };

    return (
        <>
            {contextHolder}

            <BreadcrumbBanner
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
                        gutter={[
                            { xl: 40, sm: 0, xs: 0 },
                            { xl: 0, sm: 60, xs: 60 },
                        ]}
                    >
                        <Col xl={10} sm={24} xs={24}>
                            <St.ServiceDetailImages>
                                <Image.PreviewGroup
                                    items={
                                        service?.service.images &&
                                        service?.service.images.length > 0
                                            ? getPackageListImage().map((image) => image.imageUrl)
                                            : []
                                    }
                                    fallback={fallbackImage}
                                >
                                    <Image
                                        src={image}
                                        alt={service?.service.titleName}
                                        fallback={fallbackImage}
                                    />
                                </Image.PreviewGroup>

                                <St.ServiceDetailImageList>
                                    <Swiper grabCursor breakpoints={breakpoints}>
                                        {service?.packageServiceItemList &&
                                        service.packageServiceItemList.length > 0
                                            ? renderPackageImageList()
                                            : service?.service.images.map((image) => (
                                                  <SwiperSlide
                                                      key={image.imageId}
                                                      onClick={() => handleImage(image.imageUrl)}
                                                  >
                                                      <figure>
                                                          <Image
                                                              src={image.imageUrl}
                                                              alt={service.service.titleName}
                                                              preview={false}
                                                              fallback={fallbackImage}
                                                          />
                                                      </figure>
                                                  </SwiperSlide>
                                              ))}
                                    </Swiper>
                                </St.ServiceDetailImageList>
                            </St.ServiceDetailImages>
                        </Col>

                        <Col xl={14} sm={24} xs={24}>
                            <St.ServiceDetailContent>
                                <Title level={2}>
                                    <Skeleton paragraph={false} loading={loading}>
                                        {service?.service.titleName}
                                    </Skeleton>
                                </Title>

                                <St.ServiceDetailReviewWrapper>
                                    <Skeleton paragraph={false} loading={loading}>
                                        <Space size={16} align="center">
                                            <Rate
                                                count={5}
                                                value={service?.service.avgRating}
                                                allowHalf
                                                disabled
                                            />
                                            <Text>{service?.service.avgRating.toFixed(1)}</Text>
                                        </Space>

                                        <Divider type="vertical" />

                                        <Paragraph>
                                            <Tooltip
                                                title={service?.service.numberOfSold.toLocaleString()}
                                            >
                                                <Text>
                                                    {shortenNumber(service?.service.numberOfSold)}
                                                </Text>
                                            </Tooltip>
                                            <Text>Đã bán</Text>
                                        </Paragraph>

                                        <Divider type="vertical" />

                                        <Paragraph>
                                            <Tooltip
                                                title={service?.service.numberOfReview.toLocaleString()}
                                            >
                                                <Text>
                                                    {shortenNumber(service?.service.numberOfReview)}
                                                </Text>
                                            </Tooltip>
                                            <Text>Đánh giá</Text>
                                        </Paragraph>
                                    </Skeleton>
                                </St.ServiceDetailReviewWrapper>

                                <Skeleton paragraph={false} loading={loading}>
                                    <St.ServiceDetailPrice>
                                        {buttonType ? (
                                            <Flex align="center" gap={10} wrap="wrap">
                                                <Flex align="center" gap={10} wrap="wrap">
                                                    <St.ServiceDetailOriginPrice>
                                                        {buttonType.originalPrice.toLocaleString()}đ
                                                    </St.ServiceDetailOriginPrice>
                                                    <St.ServiceDetailFinalPrice>
                                                        {buttonType.finalPrice.toLocaleString()}đ
                                                    </St.ServiceDetailFinalPrice>
                                                </Flex>

                                                <Tag
                                                    color={theme.colors.primary}
                                                    style={{ fontSize: '1.4rem' }}
                                                >
                                                    {service &&
                                                        (
                                                            (1 -
                                                                buttonType.finalPrice /
                                                                    buttonType.originalPrice) *
                                                            100
                                                        ).toFixed(0) + '% GIẢM'}
                                                </Tag>
                                            </Flex>
                                        ) : (
                                            <Flex align="center" gap={10} wrap="wrap">
                                                <Flex align="center" gap={10} wrap="wrap">
                                                    <St.ServiceDetailOriginPrice>
                                                        {service?.priceList[0].originalPrice.toLocaleString() +
                                                            'đ - '}
                                                        {service?.priceList[
                                                            service.priceList.length - 1
                                                        ].originalPrice.toLocaleString() + 'đ'}
                                                    </St.ServiceDetailOriginPrice>
                                                    <St.ServiceDetailFinalPrice>
                                                        {service?.priceList[0].finalPrice.toLocaleString() +
                                                            'đ - '}
                                                        {service?.priceList[
                                                            service.priceList.length - 1
                                                        ].finalPrice.toLocaleString() + 'đ'}
                                                    </St.ServiceDetailFinalPrice>
                                                </Flex>

                                                <Tag
                                                    color={theme.colors.primary}
                                                    style={{ fontSize: '1.4rem' }}
                                                >
                                                    {service &&
                                                        (
                                                            (1 -
                                                                service?.priceList[0]?.finalPrice /
                                                                    service?.priceList[0]
                                                                        ?.originalPrice) *
                                                            100
                                                        ).toFixed(0) + '% GIẢM'}
                                                </Tag>
                                            </Flex>
                                        )}
                                    </St.ServiceDetailPrice>
                                </Skeleton>

                                <Divider />

                                <St.ServiceDetailQuantity>
                                    <Paragraph>Số lượng:</Paragraph>
                                    <Tooltip
                                        title={`Đặt tối đa 9999 ${
                                            service?.service.unitOfMeasure || ''
                                        }`}
                                    >
                                        <InputNumber
                                            min={1}
                                            max={9999}
                                            precision={0}
                                            defaultValue={1}
                                            status={error.quantity ? 'error' : ''}
                                            onChange={handleQuantity}
                                        />
                                    </Tooltip>
                                    <Paragraph>{service?.service.unitOfMeasure}</Paragraph>
                                </St.ServiceDetailQuantity>

                                <St.ServiceDetailPeriod>
                                    <Paragraph>Chu kỳ:</Paragraph>

                                    <St.ServiceDetailPeriodWrapper>
                                        {service?.priceList
                                            .sort((a, b) => a.periodValue - b.periodValue)
                                            .map((type) => (
                                                <St.ServiceDetailPeriodCta
                                                    key={type.periodId}
                                                    type={
                                                        type.periodId === buttonType?.periodId
                                                            ? 'primary'
                                                            : 'default'
                                                    }
                                                    onClick={() => handlePeriod(type)}
                                                    danger={error.periodId}
                                                >
                                                    {`${type.periodValue} tháng`}
                                                </St.ServiceDetailPeriodCta>
                                            ))}
                                    </St.ServiceDetailPeriodWrapper>
                                </St.ServiceDetailPeriod>

                                <Divider />

                                <St.ServiceDetailButtonWrapper>
                                    <Button type="primary" onClick={handleAddToCart}>
                                        {addLoading ? (
                                            <Loading3QuartersOutlined
                                                spin
                                                style={{ fontSize: '2rem' }}
                                            />
                                        ) : (
                                            'Add to cart'
                                        )}
                                    </Button>
                                    <Button type="link" onClick={handleBuyNow}>
                                        {buyLoading ? (
                                            <Loading3QuartersOutlined
                                                spin
                                                style={{ fontSize: '2rem' }}
                                            />
                                        ) : (
                                            'Buy now'
                                        )}
                                    </Button>
                                </St.ServiceDetailButtonWrapper>
                            </St.ServiceDetailContent>
                        </Col>
                    </Row>
                </Container>
            </St.ServiceDetailSection>

            <St.ServiceDetailTabs>
                <Container>
                    <Tabs centered size="small" defaultActiveKey="1" items={tabs} />
                </Container>
            </St.ServiceDetailTabs>

            <St.ServiceDetailSimilar>
                <Container>
                    <Flex justify="space-between">
                        <Title level={2}>Dịch vụ liên quan</Title>
                        <Button type="text" onClick={handleSeeAllSimilar}>
                            Xem tất cả
                            <IoIosArrowForward />
                        </Button>
                    </Flex>

                    <ServiceList
                        loading={loading}
                        pageSize={0}
                        services={services}
                        grid={grid}
                        cardWidth={270}
                    />
                </Container>
            </St.ServiceDetailSimilar>
        </>
    );
};

export default ServiceDetail;
