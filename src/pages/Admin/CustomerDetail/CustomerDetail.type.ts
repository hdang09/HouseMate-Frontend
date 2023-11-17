import { Type, Usages } from '@/components/Calendar/Calendar.types';
import { ServiceType } from '@/components/ServiceList/ServiceItem';
import { AccountStatus, CycleEnum, Gender, Role, Status } from '@/utils/enums';

export type OrderItemType = {
    orderItemId: number;
    service: ServiceType;
    singleServiceName: string[];
    startDate: string;
    endDate: string;
    orderId: number;
    serviceId: number;
    expireDate: string;
    createDate: string;
    quantity: number;
    finalPrice: number;
    originalPrice: number;
    periodName: string;
    discountPrice: number;
};

export type MonthlyReportType = {
    serviceId: number;
    serviceName: string;
    quantity: number;
    unitOfMeasure: string;
};

export type StaffInfo = {
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
    type: Type[];
    usages: Usages[];
    groupType: string;
    currentUsage: Usages;
    serviceName: string;
    service: ServiceType;
    staff: StaffInfo;
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
    purchaseHistory: OrderItemType[];
};
