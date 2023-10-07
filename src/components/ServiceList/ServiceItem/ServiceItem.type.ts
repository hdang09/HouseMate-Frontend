import { SaleStatus } from '@/utils/enums';

export type PeriodType = {
    id: number;
    value: string;
    price: number;
};

export type ServiceType = {
    serviceId: number;
    titleName: string;
    avgRating: number;
    numberOfSold: number;
    numberOfFeedback: number;
    originalPrice: number;
    salePrice: number;
    period: PeriodType[];
    imageUrl: string[];
    description: string;
    unitOfMeasure: string;
    saleStatus: SaleStatus;
    isPackage: boolean;
};

export default ServiceType;
