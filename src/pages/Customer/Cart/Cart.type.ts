// Data type for table cart
export type CartDataType = {
    subTotal: number;
    total: number;
};

export type PeriodType = {
    periodId: number;
    periodName: string;
    percent: number;
    finalPrice: number;
    originalPrice: number;
};

export type ServiceType = {
    serviceId: number;
    originalPrice: number;
    finalPrice: number;
    titleName: string;
    numberOfSold: number;
    image: string;
    package: boolean;
};

export type CartType = {
    cartId: number;
    serviceId: number;
    quantity: number;
    periodId: number;
    originPrice: number;
    finalPrice: number;
    service: ServiceType;
};
