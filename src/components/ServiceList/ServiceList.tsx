import { List } from 'antd';
import ServiceItem from '@/components/ServiceItem';
import type { ServiceType } from '@/components/ServiceItem';

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
    return (
        <List
            grid={grid}
            pagination={pageSize ? { pageSize } : false}
            dataSource={services}
            renderItem={(service) => (
                <List.Item>
                    <ServiceItem service={service} cardWidth={cardWidth} />
                </List.Item>
            )}
            {...rest}
        />
    );
};

export default ServiceList;
