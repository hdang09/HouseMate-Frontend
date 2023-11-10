import fallbackImage from '@/assets/images/fallback-img.png';
import { StaffStatus } from '@/utils/enums';
import { StaffColumnType } from './ManageStaff.type';

export const dummy: StaffColumnType[] = [
    {
        id: 1,
        staffAvatar: fallbackImage,
        staffName: 'Duong Hoang Nam',
        point: 100,
        status: StaffStatus.WORKING,
        numberOfJobs: 50,
        successRate: 50,
    },
    {
        id: 2,
        staffAvatar: fallbackImage,
        staffName: 'Lam Thi Ngoc Han',
        point: 100,
        status: StaffStatus.QUIT,
        numberOfJobs: 50,
        successRate: 50,
    },
    {
        id: 3,
        staffAvatar: fallbackImage,
        staffName: 'Tran Hai Dang',
        point: 100,
        status: StaffStatus.WORKING,
        numberOfJobs: 50,
        successRate: 50,
    },
    {
        id: 4,
        staffAvatar: fallbackImage,
        staffName: 'Nguyen Hoang Anh',
        point: 100,
        status: StaffStatus.WORKING,
        numberOfJobs: 50,
        successRate: 50,
    },
    {
        id: 5,
        staffAvatar: fallbackImage,
        staffName: 'Tran Tan Thanh',
        point: 100,
        status: StaffStatus.WORKING,
        numberOfJobs: 50,
        successRate: 50,
    },
];
