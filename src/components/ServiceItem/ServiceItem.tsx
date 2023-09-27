import * as St from './ServiceItem.styled';

import { Rate, Space } from 'antd';

import { Link } from 'react-router-dom';
import config from '@/config';
import serviceImg from '@/assets/images/service-img.png';

// TODO: Fix type of services
const ServiceItem = ({ service }: { service: any }) => {
    return (
        <Link to={`${config.routes.admin.services}/${service}`}>
            <St.ServiceCard
                hoverable
                cover={
                    <>
                        <St.ServiceImage alt="Cleaning service" src={serviceImg} preview={false} />
                        <St.AddToCartBtn type="primary">Add to cart</St.AddToCartBtn>
                    </>
                }
                // extra={<h1>Best Seller</h1>}
                bordered
            >
                <St.ServiceTitle level={4}>Cleaning service</St.ServiceTitle>

                <Space>
                    <St.OldPrice>1500</St.OldPrice>
                    <St.NewPrice>100</St.NewPrice>
                </Space>

                <Space size="large">
                    <Rate allowHalf defaultValue={2.5} />
                    <span>{1.3}k sold</span>
                </Space>
            </St.ServiceCard>
        </Link>
    );
};

ServiceItem.propTypes = {};

export default ServiceItem;
