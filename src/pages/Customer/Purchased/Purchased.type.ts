import { ServiceType } from '@/components/ServiceList/ServiceItem';

type PurchasedType = {
    orderItemId: number;
    service: ServiceType;
    singleServiceName: string[];
    startDate: string;
    endDate: string;
};

export default PurchasedType;
