import { Service, Status, UnitOfMeasure } from '@/utils/enums';

type UsageItem = {
    id: number;
    icon: React.ReactNode;
    serviceName: string;
    quantityRemaining: number;
    quantityPurchased: number;
    unitOfMeasure: UnitOfMeasure;
};

type Event = {
    title: Service;
    start: Date;
    end: Date;
    status: Status;
    staff: string;
    phone: string;
};

type Purchased = {
    titleName: string;
    startDate: string;
    endDate: string;
    serviceImg: string;
    usage: UsageItem[];
    events: Event[];
    package: boolean;
};

export type { UsageItem, Event, Purchased };
