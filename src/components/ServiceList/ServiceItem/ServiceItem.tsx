import { Space, notification } from 'antd';
import { LoadingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useState } from 'react';

import fallbackImg from '@/assets/images/fallback-img.png';
import config from '@/config';
import { addToCart } from '@/utils/cartAPI';
import { Category, Role, SaleStatus } from '@/utils/enums';

import type { ServiceType } from '.';
import * as Styled from './ServiceItem.styled';

type ServiceItemProps = {
    role: string | null;
    service: ServiceType;
    cardWidth: number;
};

const ServiceItem = ({ role, service, cardWidth }: ServiceItemProps) => {
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

        if (loading) return;

        try {
            setLoading(true);

            const service = {
                serviceId: item.serviceId,
                quantity: 1,
                periodId: 1,
            };

            await addToCart(service);

            api['success']({
                message: 'Success',
                description: 'Successfully added to cart!',
            });
        } catch (error: any) {
            if (error.response) api.error(error.response.data);
            else api.error(error.message);
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
                    $isSale={service.saleStatus === SaleStatus.AVAILABLE}
                    hoverable
                    cover={
                        <>
                            <Styled.ServiceImage
                                alt={service.titleName}
                                src={service.imageUrl[0] || fallbackImg}
                                preview={false}
                            />

                            {/* // TODO: Handle cart logic */}
                            {(!role || role === Role.CUSTOMER) && (
                                <Styled.LinkButton onClick={(e) => handleAddToCart(e, service)}>
                                    <Styled.AddToCartBtn type="primary">
                                        {loading ? (
                                            <LoadingOutlined style={{ fontSize: '1.8rem' }} />
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
                        {service.isPackage ? Category.PACKAGE_SERVICE : Category.SINGLE_SERVICE}
                    </Styled.ServiceCategory>

                    <Styled.ServiceTitle level={4}>{service.titleName}</Styled.ServiceTitle>

                    <Space size={6} style={{ display: 'flex' }}>
                        <Styled.OldPrice>{service.originalPrice}</Styled.OldPrice>
                        <Styled.NewPrice>{service.salePrice}</Styled.NewPrice>
                    </Space>

                    <Space size={10} style={{ display: 'flex' }}>
                        <Styled.Rating allowHalf defaultValue={service.avgRating} disabled />
                        <Styled.TotalSold>{service.numberOfSold / 1000}k sold</Styled.TotalSold>
                    </Space>
                </Styled.ServiceCard>
            </Styled.ServiceLink>
        </>
    );
};

ServiceItem.propTypes = {};

export default ServiceItem;
