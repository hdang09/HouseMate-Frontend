import { Role } from '@/utils/enums';

export type UserInfo = {
    id: number;
    avatar: string;
    fullName: string;
    dateOfBirth: string;
    sex: string;
    phone: string;
    role: typeof Role;
    email: string;
    address: string;
    numberOfOrder: number;
    amountSpent: number;
    numberOfTransactions: number;
};

export type CustomerReport = {
    serviceName: string;
    quantity: number;
    UnitOfMeasure: string;
};

export type User = {
    user: UserInfo;
    report: CustomerReport[];
};
