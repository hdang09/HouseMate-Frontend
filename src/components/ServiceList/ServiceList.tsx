import { List, PaginationProps } from 'antd';

import ServiceItem from '@/components/ServiceList/ServiceItem';
import type { ServiceType } from '@/components/ServiceList/ServiceItem';
import { useAuth } from '@/hooks';

type ServiceListProps = {
    services: ServiceType[];
    grid: object; // Default grid type from antd
    loading?: boolean;
    current?: number;
    pageSize?: number;
    totalElement?: number;
    handleChangePage?: PaginationProps['onChange'];
    cardWidth?: number;
};

const ServiceList = ({
    services,
    grid,
    loading,
    current = 1,
    pageSize = 9,
    totalElement = 0,
    handleChangePage,
    cardWidth = 260,
    ...rest
}: ServiceListProps) => {
    const { user, role } = useAuth();

    return (
        <List
            grid={grid}
            loading={loading}
            pagination={
                pageSize
                    ? {
                          current,
                          pageSize,
                          hideOnSinglePage: services.length < pageSize,
                          total: totalElement,
                          onChange: handleChangePage,
                      }
                    : false
            }
            dataSource={services}
            renderItem={(service) => (
                <List.Item>
                    <ServiceItem user={user} role={role} service={service} cardWidth={cardWidth} />
                </List.Item>
            )}
            {...rest}
        />
    );
};

export default ServiceList;
