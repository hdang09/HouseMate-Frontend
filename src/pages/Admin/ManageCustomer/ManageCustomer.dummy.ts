import fallbackImage from '@/assets/images/fallback-img.png';
import { CustomerColumnType } from './ManageCustomer.type';

export const dummy: CustomerColumnType[] = [
    {
        id: 1,
        customerAvatar: fallbackImage,
        customerName: 'Dương Hoàng Nam',
        numberOfSchedule: 90,
        amountSpent: 1000000,
        numberOfTransactions: 3,
        date: '12-10-2023',
    },
    {
        id: 2,
        customerAvatar: fallbackImage,
        customerName: 'Lâm Thị Ngọc Hân',
        numberOfSchedule: 80,
        amountSpent: 1000000,
        numberOfTransactions: 5,
        date: '12-10-2023',
    },
    {
        id: 3,
        customerAvatar: fallbackImage,
        customerName: 'Trần Hải Đăng',
        numberOfSchedule: 100,
        amountSpent: 1000000,
        numberOfTransactions: 6,
        date: '12-10-2023',
    },
    {
        id: 4,
        customerAvatar: fallbackImage,
        customerName: 'Nguyễn Hoàng Anh',
        numberOfSchedule: 100,
        amountSpent: 1000000,
        numberOfTransactions: 7,
        date: '12-10-2023',
    },
    {
        id: 5,
        customerAvatar: fallbackImage,
        customerName: 'Trần Tấn Thành',
        numberOfSchedule: 100,
        amountSpent: 1000000,
        numberOfTransactions: 5,
        date: '12-10-2023',
    },
];
