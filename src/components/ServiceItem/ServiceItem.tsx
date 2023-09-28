import * as St from './ServiceItem.styled';

import { Role, SaleStatus } from '@/utils/enums';

import type { ServiceType } from '.';
import { Space } from 'antd';
import config from '@/config';
import serviceImg from '@/assets/images/service-img.png';

type ServiceItemProps = {
    service: ServiceType;
    cardWidth?: number;
};

const ServiceItem = ({ service, cardWidth = 250 }: ServiceItemProps) => {
    const role: Role = true ? Role.CUSTOMER : Role.ADMIN; // TODO: Authorization

    // Handle route
    let route: string = '';
    if (role === Role.ADMIN) {
        route = `${config.routes.admin.services}/${service.id}`;
    } else if (role === Role.CUSTOMER) {
        route = `${config.routes.services}/${service.id}`;
    }

    return (
        <St.LinkCard to={route}>
            <St.SaleRibbon text="Sale" $isSale={service.saleStatus === SaleStatus.AVAILABLE}>
                <St.ServiceCard
                    $width={cardWidth}
                    hoverable
                    cover={
                        <>
                            <St.ServiceImage
                                alt={service.titleName}
                                src={serviceImg}
                                preview={false}
                            />

                            <St.LinkButton
                                to={`${config.routes.admin.services}/cart/${service.id}`}
                            >
                                <St.AddToCartBtn type="primary">
                                    <St.CartIcon /> Add to cart
                                </St.AddToCartBtn>
                            </St.LinkButton>
                        </>
                    }
                    bordered
                >
                    <St.ServiceTitle level={4}>{service.titleName}</St.ServiceTitle>

                    <Space>
                        <St.OldPrice>{service.oldPrice}</St.OldPrice>
                        <St.NewPrice>{service.salePrice}</St.NewPrice>
                    </Space>

                    <Space size="middle">
                        <St.Rating allowHalf defaultValue={service.rating} disabled />
                        <span>{service.totalSold} sold</span>
                    </Space>
                </St.ServiceCard>
            </St.SaleRibbon>
        </St.LinkCard>
    );
};

ServiceItem.propTypes = {};

export default ServiceItem;
