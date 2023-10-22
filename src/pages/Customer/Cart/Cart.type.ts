import { GroupType, SaleStatus, UnitOfMeasure } from '@/utils/enums';

// Data type for table cart
export type CartDataType = {
    subTotal: number;
    total: number;
};

export type ServiceType = {
    serviceId: number;
    titleName: string;
    originalPrice: number;
    salePrice: number;
    finalPrice: number;
    unitOfMeasure: UnitOfMeasure;
    description: string;
    saleStatus: SaleStatus;
    groupType: GroupType;
    avgRating: number;
    numberOfSold: number;
    mainImg: string;
    numberOfReview: number;
    numberOfComment: number;
    package: boolean;
};

export type PeriodType = {
    periodId: number;
    serviceId: number;
    periodValue: number;
    periodName: string;
    finalPrice: number;
    originalPrice: number;
    percent: number;
};

export type CartType = {
    cartId: number;
    serviceId: number;
    quantity: number;
    periodId: number;
    finalPrice: number;
    originalPrice: number;
    listPeriod: PeriodType[];
    service: ServiceType;
};
