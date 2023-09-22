import { List } from 'antd';
import ServiceItem from '@/components/ServiceItem';

// TODO: Fix type of services
const ServiceList = ({ services }: { services: any[] }) => {
    return (
        <List
            grid={{
                gutter: 24,
                xs: 1,
                md: 2,
                lg: 3,
                xxl: 4,
            }}
            dataSource={services}
            renderItem={(service) => (
                <List.Item>
                    <ServiceItem service={service} />
                </List.Item>
            )}
        ></List>
    );
};

export default ServiceList;
