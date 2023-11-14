import { UserType } from '@/hooks/useAuth';

export interface Report {
    serviceId: number;
    serviceName: string;
    quantity: number;
    unitOfMeasure: string;
}

export interface StaffProfile {
    achievement: Report[];
    monthlyReport: Report[];
    userInfo: UserType;
}

export interface DateRange {
    start: string;
    end: string;
}
