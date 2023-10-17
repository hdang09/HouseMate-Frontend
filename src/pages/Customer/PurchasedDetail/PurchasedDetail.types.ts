import { Status, UnitOfMeasure } from '@/utils/enums';

type UsageItem = {
    id: number;
    icon: React.ReactNode;
    serviceName: string;
    quantityRemaining: number;
    quantityPurchased: number;
    unitOfMeasure: UnitOfMeasure;
};

type Event = {
    title: string;
    start: Date;
    end: Date;
    status: Status;
    staff: string | null;
    phone: string | null;
};

type Purchased = {
    titleName: string;
    startDate: string;
    endDate: string;
    serviceImg: string;
    usage: UsageItem[];
    package: boolean;
};

export type { UsageItem, Event, Purchased };
