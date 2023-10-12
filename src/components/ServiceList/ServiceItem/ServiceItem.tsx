import { Space } from 'antd';

import fallbackImg from '@/assets/images/fallback-img.png';
import config from '@/config';
import { Category, Role, SaleStatus } from '@/utils/enums';

import type { ServiceType } from '.';
import * as Styled from './ServiceItem.styled';

type ServiceItemProps = {
    role: string | null;
    service: ServiceType;
    cardWidth: number;
};

const ServiceItem = ({ role, service, cardWidth }: ServiceItemProps) => {
    // Handle route
    let route: string = '';
    if (role === Role.ADMIN) {
        route = `${config.routes.admin.services}/${service.serviceId}`;
    } else {
        route = `${config.routes.public.shop}/${service.serviceId}`;
    }

    // Click add to cart button
    const handleAddToCart = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        // TODO: Handle later
    };

    return (
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
                            <Styled.LinkButton onClick={handleAddToCart}>
                                <Styled.AddToCartBtn type="primary">
                                    <Styled.CartIcon /> Add to cart
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
    );
};

ServiceItem.propTypes = {};

export default ServiceItem;
