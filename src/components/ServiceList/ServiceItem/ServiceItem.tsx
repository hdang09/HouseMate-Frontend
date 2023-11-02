import * as Styled from './ServiceItem.styled';

import { CategoryLabel, Role, SaleStatus } from '@/utils/enums';
import { Loading3QuartersOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Space, Typography, notification } from 'antd';

import type { ServiceType } from '.';
import { UserType } from '@/hooks/useAuth';
import { addToCart } from '@/utils/cartAPI';
import { cartSlice } from '@/layouts/MainLayout/slice';
import config from '@/config';
import fallbackImg from '@/assets/images/fallback-img.png';
import shortenNumber from '@/utils/shortenNumber';
import { useAppDispatch } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type ServiceItemProps = {
    user: UserType | undefined;
    role: string | null;
    service: ServiceType;
    cardWidth: number;
};

const { Text } = Typography;

const ServiceItem = ({ user, role, service, cardWidth }: ServiceItemProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // Show toast
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });
    const [loading, setLoading] = useState<boolean>(false);

    // Handle route
    let route: string = '';
    if (role === Role.ADMIN) {
        route = `${config.routes.admin.services}/${service.serviceId}`;
    } else {
        route = `${config.routes.public.shop}/${service.serviceId}`;
    }

    // Click add to cart button
    const handleAddToCart = async (e: React.MouseEvent<HTMLElement>, item: ServiceType) => {
        e.preventDefault();

        if (!user) {
            navigate(config.routes.public.login);
            return;
        }

        if (loading) return;

        try {
            setLoading(true);

            const service = {
                serviceId: +item.serviceId,
                quantity: 1,
                periodId: 0,
            };

            const { data } = await addToCart(service);
            dispatch(cartSlice.actions.setLength(data));

            api.success({ message: 'Success', description: 'Successfully added to cart!' });
        } catch (error: any) {
            api.error({
                message: 'Error',
                description: error.response ? error.response.data : error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}

            <Styled.ServiceLink to={route}>
                <Styled.ServiceCard
                    $width={cardWidth}
                    hoverable
                    cover={
                        <>
                            <Styled.ServiceImage
                                alt={service.titleName}
                                src={
                                    service.images && service.images.length > 0
                                        ? service.images[0]?.imageUrl
                                        : ''
                                }
                                preview={false}
                                fallback={fallbackImg}
                            />

                            {(!role || role === Role.CUSTOMER) && (
                                <Styled.LinkButton onClick={(e) => handleAddToCart(e, service)}>
                                    <Styled.AddToCartBtn type="primary">
                                        {loading ? (
                                            <Loading3QuartersOutlined
                                                spin
                                                style={{ fontSize: '1.6rem' }}
                                            />
                                        ) : (
                                            <ShoppingCartOutlined style={{ fontSize: '1.8rem' }} />
                                        )}
                                        Thêm giỏ hàng
                                    </Styled.AddToCartBtn>
                                </Styled.LinkButton>
                            )}
                        </>
                    }
                    bordered
                >
                    <Styled.ServiceCategory>
                        {service.package ? CategoryLabel.PACKAGE : CategoryLabel.SINGLE}
                    </Styled.ServiceCategory>

                    <Styled.ServiceTitle level={3}>{service.titleName}</Styled.ServiceTitle>

                    <Space size={6} style={{ display: 'flex' }}>
                        {service.originalPrice !== service.finalPrice && (
                            <Styled.OldPrice>
                                {service.originalPrice.toLocaleString() + 'đ'}
                            </Styled.OldPrice>
                        )}
                        <Styled.NewPrice>
                            {service.finalPrice.toLocaleString() + 'đ'}
                            <Styled.Unit>/{service.unitOfMeasure}</Styled.Unit>
                        </Styled.NewPrice>
                    </Space>

                    <Space size={10} style={{ display: 'flex' }}>
                        <Styled.Rating count={5} allowHalf value={service.avgRating} disabled />
                        <Styled.TotalSold>
                            {shortenNumber(service.numberOfSold)} đã bán
                        </Styled.TotalSold>
                    </Space>

                    {service.saleStatus === SaleStatus.ONSALE && (
                        <Styled.SalePercent>
                            <Text>
                                {((1 - service.finalPrice / service.originalPrice) * 100).toFixed(
                                    0,
                                )}
                                %
                            </Text>
                            <Text>Giảm</Text>
                        </Styled.SalePercent>
                    )}
                </Styled.ServiceCard>
            </Styled.ServiceLink>
        </>
    );
};

ServiceItem.propTypes = {};

export default ServiceItem;
