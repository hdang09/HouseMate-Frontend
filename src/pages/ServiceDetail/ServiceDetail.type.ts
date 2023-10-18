export type ServiceType = {
    serviceId: number;
    titleName: string;
    originalPrice: number;
    finalPrice: number;
    salePrice: number;
    unitOfMeasure: string;
    description: string;
    saleStatus: string;
    groupType: string;
    avgRating: number;
    numberOfSold: number;
    mainImg: string;
    numberOfReview: number;
    numberOfComment: number;
    package: boolean;
};

export type TypeListType = {
    serviceTypeId: number;
    serviceId: number;
    typeName: string;
};

export type PriceListType = {
    durationValue: number;
    durationUnit: string;
    originalPrice: number;
    final_price: number;
};

export type ServiceDetailType = {
    service: ServiceType;
    typeList: TypeListType[];
    priceList: PriceListType[];
    images: string[];
};
