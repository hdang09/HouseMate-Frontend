import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';

import serviceImg from '@/assets/images/service-img.jpg';
import config from '@/config';
import { useAuth } from '@/hooks';
import { Role, SaleStatus } from '@/utils/enums';

import type { ServiceType } from '.';
import * as Styled from './ServiceItem.styled';

type ServiceItemProps = {
    service: ServiceType;
    cardWidth: number;
};

const ServiceItem = ({ service, cardWidth }: ServiceItemProps) => {
    const { role } = useAuth();
    const navigate = useNavigate();

    // Handle route
    let route: string = '';
    if (role === Role.ADMIN) {
        route = `${config.routes.admin.services}/${service.id}`;
    } else {
        route = `${config.routes.public.shop}/${service.id}`;
    }

    // Click add to cart button
    const handleAddToCart = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`${config.routes.public.shop}/cart/${service.id}`);
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
                            src={serviceImg}
                            preview={false}
                        />

                        {/* // TODO: Handle cart logic */}
                        {!role && (
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
                <Styled.ServiceCategory>{service.category}</Styled.ServiceCategory>

                <Styled.ServiceTitle level={4}>{service.titleName}</Styled.ServiceTitle>

                <Space size={6} style={{ display: 'flex' }}>
                    <Styled.OldPrice>{service.oldPrice}</Styled.OldPrice>
                    <Styled.NewPrice>{service.salePrice}</Styled.NewPrice>
                </Space>

                <Space size={10} style={{ display: 'flex' }}>
                    <Styled.Rating allowHalf defaultValue={service.rating} disabled />
                    <Styled.TotalSold>{service.totalSold / 1000}k sold</Styled.TotalSold>
                </Space>
            </Styled.ServiceCard>
        </Styled.ServiceLink>
    );
};

ServiceItem.propTypes = {};

export default ServiceItem;
