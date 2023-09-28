import { List } from 'antd';
import ServiceItem from '@/components/ServiceItem';
import type { ServiceType } from '../ServiceItem';

type ServiceListProps = {
    services: ServiceType[];
    grid: object; // Default grid type from antd
    pageSize?: number;
    cardWidth?: number;
};

const ServiceList = ({ services, grid, pageSize = 8, cardWidth }: ServiceListProps) => {
    return (
        <List
            grid={grid}
            pagination={{ pageSize: pageSize }}
            dataSource={services}
            renderItem={(service) => (
                <List.Item>
                    <ServiceItem service={service} cardWidth={cardWidth} />
                </List.Item>
            )}
        />
    );
};

export default ServiceList;
