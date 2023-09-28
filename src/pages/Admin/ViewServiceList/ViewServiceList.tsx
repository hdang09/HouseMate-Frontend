import * as St from './ViewServiceList.styled';

import ServiceList from '@/components/ServiceList';

type ServiceType = {
    id: number;
    titleName: string;
    // unitOfMeasure UnitOfMeasure;
    oldPrice: number;
    salePrice: number;
    description?: string;
    // saleStatus SaleStatus;
    rating: number;
    creatorId?: number;
    totalSold: number;
    // createdAt: Date;
};

const ViewServiceList: React.FC = () => {
    const services: ServiceType[] = [
        {
            id: 1,
            titleName: 'Cleaning service',
            oldPrice: 1500,
            salePrice: 100,
            rating: 4.8,
            totalSold: 1300,
        },
        {
            id: 2,
            titleName: 'Cleaning service',
            oldPrice: 1500,
            salePrice: 100,
            rating: 4.8,
            totalSold: 1300,
        },
        {
            id: 3,
            titleName: 'Cleaning service',
            oldPrice: 1500,
            salePrice: 100,
            rating: 4.8,
            totalSold: 1300,
        },
        {
            id: 4,
            titleName: 'Cleaning service',
            oldPrice: 1500,
            salePrice: 100,
            rating: 4.8,
            totalSold: 1300,
        },
        {
            id: 5,
            titleName: 'Cleaning service',
            oldPrice: 1500,
            salePrice: 100,
            rating: 4.8,
            totalSold: 1300,
        },
    ];

    return (
        <>
            <St.WebTitle level={1}>View service list</St.WebTitle>
            <ServiceList services={services} />
        </>
    );
};

export default ViewServiceList;
