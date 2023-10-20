import { UnitOfMeasure } from '@/utils/enums';

type UsageItem = {
    id: number;
    icon: React.ReactNode;
    serviceName: string;
    quantityRemaining: number;
    quantityPurchased: number;
    unitOfMeasure: UnitOfMeasure;
};

type Purchased = {
    titleName: string;
    startDate: string;
    endDate: string;
    serviceImg: string;
    usage: UsageItem[];
    package: boolean;
};

export type { UsageItem, Purchased };
