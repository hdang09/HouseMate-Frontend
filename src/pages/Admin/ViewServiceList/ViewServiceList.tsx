import * as St from './ViewServiceList.styled';

import { useEffect, useState } from 'react';

import { SaleStatus } from '@/utils/enums';
import ServiceList from '@/components/ServiceList';
import type { ServiceType } from '@/components/ServiceItem';
import { Skeleton } from 'antd';
import servicesDummy from './ViewServiceList.dummy';

const ViewServiceList: React.FC = () => {
    const [services, setServices] = useState<ServiceType[]>([]);

    // Skeleton
    const [loading, setLoading] = useState<boolean>(true);

    // Number of items for responsive
    const grid = {
        gutter: 24,
        xs: 1,
        md: 1,
        lg: 2,
        xl: 3,
        xxl: 4,
    };

    // Fetch API
    useEffect(() => {
        const getAllServices = () => {
            try {
                setLoading(true);
                // ...
                // ... Fetch API
                // ...
                setServices(servicesDummy.filter((x) => x.saleStatus != SaleStatus.DISCONTINUED));
            } finally {
                setLoading(false);
            }
        };

        getAllServices();
    }, []);

    return (
        <>
            <St.WebTitle level={1}>View service list</St.WebTitle>
            <Skeleton loading={loading}>
                <ServiceList services={services} grid={grid} />
            </Skeleton>
        </>
    );
};

export default ViewServiceList;
