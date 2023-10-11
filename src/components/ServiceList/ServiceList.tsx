import { List } from 'antd';

import ServiceItem from '@/components/ServiceList/ServiceItem';
import type { ServiceType } from '@/components/ServiceList/ServiceItem';
import { useAuth } from '@/hooks';

type ServiceListProps = {
    services: ServiceType[];
    grid: object; // Default grid type from antd
    pageSize?: number;
    cardWidth?: number;
};

const ServiceList = ({
    services,
    grid,
    pageSize = 8,
    cardWidth = 260,
    ...rest
}: ServiceListProps) => {
    const { role } = useAuth();

    return (
        <List
            grid={grid}
            pagination={
                pageSize ? { pageSize, hideOnSinglePage: services.length < pageSize } : false
            }
            dataSource={services}
            renderItem={(service) => (
                <List.Item>
                    <ServiceItem role={role} service={service} cardWidth={cardWidth} />
                </List.Item>
            )}
            {...rest}
        />
    );
};

export default ServiceList;
