type UsageItem = {
    userUsageId: number;
    userId: number;
    serviceId: number;
    remaining: number;
    total: number;
    startDate: Date;
    endDate: Date;
    orderItemId: number;
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
