import fallbackImage from '@/assets/images/fallback-img.png';
import { CustomerColumnType } from './ManageCustomer.type';

export const dummy: CustomerColumnType[] = [
    {
        id: 1,
        customerAvatar: fallbackImage,
        customerName: 'Dương Hoàng Nam',
        numberOfOrder: 100,
        amountSpent: 1000000,
        numberOfTransactions: 3,
    },
    {
        id: 2,
        customerAvatar: fallbackImage,
        customerName: 'Lâm Thị Ngọc Hân',
        numberOfOrder: 100,
        amountSpent: 1000000,
        numberOfTransactions: 5,
    },
    {
        id: 3,
        customerAvatar: fallbackImage,
        customerName: 'Trần Hải Đăng',
        numberOfOrder: 100,
        amountSpent: 1000000,
        numberOfTransactions: 6,
    },
    {
        id: 4,
        customerAvatar: fallbackImage,
        customerName: 'Nguyễn Hoàng Anh',
        numberOfOrder: 100,
        amountSpent: 1000000,
        numberOfTransactions: 7,
    },
    {
        id: 5,
        customerAvatar: fallbackImage,
        customerName: 'Trần Tấn Thành',
        numberOfOrder: 100,
        amountSpent: 1000000,
        numberOfTransactions: 5,
    },
];
