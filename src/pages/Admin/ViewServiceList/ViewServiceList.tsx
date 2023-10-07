import * as St from './ViewServiceList.styled';

import { useEffect, useState } from 'react';

import { SaleStatus } from '@/utils/enums';
import ServiceList from '@/components/ServiceList';
import type { ServiceType } from '@/components/ServiceList/ServiceItem';
import { Skeleton } from 'antd';
import servicesDummy from '@/components/ServiceList/ServiceList.dummy';

const ViewServiceList: React.FC = () => {
    const [services, setServices] = useState<ServiceType[]>([]);

    // Skeleton
    const [loading, setLoading] = useState<boolean>(true);

    // Number of items for responsive
    const grid = {
        gutter: [24, 24],
    };

    // Fetch API
    useEffect(() => {
        const getAllServices = () => {
            try {
                setLoading(true);
                // ...
                // ... Fetch API
                // ...
                setServices(servicesDummy.filter((x) => x.salePrice != SaleStatus.DISCONTINUED));
            } finally {
                setLoading(false);
            }
        };

        getAllServices();
    }, []);

    return (
        <St.ServiceWrapper direction="vertical" size={0}>
            <St.WebTitle level={1}>View service list</St.WebTitle>
            <Skeleton loading={loading}>
                <ServiceList services={services} grid={grid} />
            </Skeleton>
        </St.ServiceWrapper>
    );
};

export default ViewServiceList;
