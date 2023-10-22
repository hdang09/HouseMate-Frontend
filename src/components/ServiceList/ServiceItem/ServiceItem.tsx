import { Space, notification } from 'antd';
import { Loading3QuartersOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import fallbackImg from '@/assets/images/fallback-img.png';
import config from '@/config';
import { UserType } from '@/hooks/useAuth';
import { addToCart } from '@/utils/cartAPI';
import { Category, Role, SaleStatus } from '@/utils/enums';
import shortenNumber from '@/utils/shortenNumber';

import type { ServiceType } from '.';
import * as Styled from './ServiceItem.styled';

type ServiceItemProps = {
    user: UserType | undefined;
    role: string | null;
    service: ServiceType;
    cardWidth: number;
};

const ServiceItem = ({ user, role, service, cardWidth }: ServiceItemProps) => {
    const navigate = useNavigate();
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

            await addToCart(service);

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
                    $isSale={service.saleStatus === SaleStatus.ONSALE}
                    hoverable
                    cover={
                        <>
                            <Styled.ServiceImage
                                alt={service.titleName}
                                src={service.mainImg}
                                preview={false}
                                fallback={fallbackImg}
                            />

                            {/* // TODO: Handle cart logic */}
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
                                        Add to cart
                                    </Styled.AddToCartBtn>
                                </Styled.LinkButton>
                            )}
                        </>
                    }
                    bordered
                >
                    <Styled.ServiceCategory>
                        {service.package ? Category.PACKAGE_SERVICE : Category.SINGLE_SERVICE}
                    </Styled.ServiceCategory>

                    <Styled.ServiceTitle level={4}>{service.titleName}</Styled.ServiceTitle>

                    <Space size={6} style={{ display: 'flex' }}>
                        <Styled.OldPrice>{service.originalPrice.toLocaleString()}</Styled.OldPrice>
                        <Styled.NewPrice>{service.finalPrice.toLocaleString()}</Styled.NewPrice>
                    </Space>

                    <Space size={10} style={{ display: 'flex' }}>
                        <Styled.Rating count={5} allowHalf value={service.avgRating} disabled />
                        <Styled.TotalSold>
                            {shortenNumber(service.numberOfSold)} sold
                        </Styled.TotalSold>
                    </Space>
                </Styled.ServiceCard>
            </Styled.ServiceLink>
        </>
    );
};

ServiceItem.propTypes = {};

export default ServiceItem;
