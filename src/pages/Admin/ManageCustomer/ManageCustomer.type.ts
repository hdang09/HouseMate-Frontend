import { AccountStatus } from '@/utils/enums';

export type CustomerColumnType = {
    userId: number;
    avatar: string;
    userName: string;
    numberOfSchedule: number;
    amountSpent: number;
    numberOfOrder: number;
    date: string;
    accountStatus: AccountStatus;
};
