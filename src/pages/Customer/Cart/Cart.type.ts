import { ServiceType } from '@/components/ServiceList/ServiceItem';

// Data type for table cart
export type CartDataType = {
    subTotal: number;
    total: number;
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
