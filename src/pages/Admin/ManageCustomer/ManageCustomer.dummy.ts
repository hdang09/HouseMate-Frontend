import fallbackImage from '@/assets/images/fallback-img.png';
import { CustomerColumnType } from './ManageCustomer.type';

export const dummy: CustomerColumnType[] = [
    {
        userId: 1,
        avatar: fallbackImage,
        userName: 'Dương Hoàng Nam',
        numberOfSchedule: 90,
        amountSpent: 1000000,
        numberOfOrder: 3,
        date: '12-10-2023',
    },
];
