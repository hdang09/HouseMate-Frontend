import * as Styled from './ServiceItem.styled';

import { Role, SaleStatus } from '@/utils/enums';

import type { ServiceType } from '.';
import { Space } from 'antd';
import config from '@/config';
import serviceImg from '@/assets/images/service-img.png';

type ServiceItemProps = {
    service: ServiceType;
    cardWidth: number;
};

const ServiceItem = ({ service, cardWidth }: ServiceItemProps) => {
    // TODO: Authorization
    const role: Role = true ? Role.ADMIN : Role.CUSTOMER;

    // Handle route
    let route: string = '';
    if (role === Role.ADMIN) {
        route = `${config.routes.admin.services}/${service.id}`;
    } else if (role === Role.CUSTOMER) {
        route = `${config.routes.services}/${service.id}`;
    }

    return (
        <Styled.LinkCard to={route}>
            <Styled.ServiceCard
                $width={cardWidth}
                hoverable
                cover={
                    <Styled.SaleRibbon
                        text="Sale"
                        $isSale={service.saleStatus === SaleStatus.AVAILABLE}
                    >
                        <Styled.ServiceImage
                            alt={service.titleName}
                            src={serviceImg}
                            preview={false}
                        />

                        {role === Role.CUSTOMER && (
                            <Styled.LinkButton to={`${config.routes.services}/cart/${service.id}`}>
                                <Styled.AddToCartBtn type="primary">
                                    <Styled.CartIcon /> Add to cart
                                </Styled.AddToCartBtn>
                            </Styled.LinkButton>
                        )}
                    </Styled.SaleRibbon>
                }
                bordered
            >
                <Styled.ServiceTitle level={4}>{service.titleName}</Styled.ServiceTitle>

                <Space>
                    <Styled.OldPrice>{service.oldPrice}</Styled.OldPrice>
                    <Styled.NewPrice>{service.salePrice}</Styled.NewPrice>
                </Space>

                <Space size="small">
                    <Styled.Rating allowHalf defaultValue={service.rating} disabled />
                    <Styled.TotalSold>{service.totalSold}</Styled.TotalSold>
                </Space>
            </Styled.ServiceCard>
        </Styled.LinkCard>
    );
};

ServiceItem.propTypes = {};

export default ServiceItem;
