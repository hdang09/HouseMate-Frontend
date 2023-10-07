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

export type { UsageItem, Event };
