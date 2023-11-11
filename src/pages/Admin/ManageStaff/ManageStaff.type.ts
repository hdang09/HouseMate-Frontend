import { AccountStatus } from '@/utils/enums';

export type StaffColumnType = {
    id: number;
    staffAvatar: string;
    staffName: string;
    point: number;
    status: AccountStatus;
    numberOfJobs: number;
    successRate: number;
};
