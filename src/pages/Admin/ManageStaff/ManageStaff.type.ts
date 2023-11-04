import { StaffStatus } from '@/utils/enums';

export type StaffColumnType = {
    id: number;
    staffAvatar: string;
    staffName: string;
    point: number;
    status: StaffStatus;
    numberOfJobs: number;
};
