import { GroupType, SaleStatus, UnitOfMeasure } from '@/utils/enums';

export type PriceListType = {
    periodId: number;
    serviceId: string;
    periodValue: number;
    periodName: string;
    originalPrice: number;
    finalPrice: number;
};

export type TypeListType = {
    serviceTypeId: number;
    serviceId: number;
    typeName: string;
};

export type ServiceType = {
    serviceId: number;
    titleName: string;
    originalPrice: number;
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

export type ServiceDetailType = {
    service: ServiceType;
    typeList: TypeListType[];
    priceList: PriceListType[];
    images: string[];
};
