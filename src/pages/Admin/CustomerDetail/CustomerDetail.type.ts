import { Type, Usages } from '@/components/Calendar/Calendar.types';
import { ServiceType } from '@/components/ServiceList/ServiceItem';
import { AccountStatus, CycleEnum, Gender, Role, Status } from '@/utils/enums';

export type MonthlyReportType = {
    serviceId: number;
    serviceName: string;
    quantity: number;
    unitOfMeasure: string;
};

export type UsageHistoryType = {
    scheduleId: number;
    serviceId: number;
    serviceTypeId: number;
    customerId: number;
    staffId: number;
    quantityRetrieve: number;
    startDate: string;
    endDate: string;
    note: string;
    cycle: CycleEnum;
    status: Status;
    parentScheduleId: number;
    userUsageId: number;
    onTask: boolean;
    staff: null; // TODO: Spam Data
    phone: string;
    type: Type[]; // TODO: Spam Data
    usages: Usages[]; // TODO: Spam Data
    groupType: string; // TODO: Spam Data
    currentUsage: Usages; // TODO: Spam Data
    serviceName: string;
    service: ServiceType;
};

export interface UserInfo {
    userId: number;
    role: typeof Role;
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    emailValidationStatus: boolean;
    avatar: string;
    address: string;
    proficiencyScore: number;
    avgRating: number;
    accountStatus: AccountStatus;
    createdAt: string;
    identityCard: string;
    dateOfBirth: string;
    gender: Gender;
    banned: boolean;
}

export type CustomerDetailType = {
    numberOfOrder: number;
    amountSpent: number;
    userInfo: UserInfo;
    usageHistory: UsageHistoryType[];
    monthlyReport: MonthlyReportType[];
};
