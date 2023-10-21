import { UserType } from './Profile.type';
import userAvatar from '@/assets/images/service-img.webp';

export const dummy: UserType = {
    avatar: userAvatar,
    position: 'Nhân viên',
    fullName: 'Duong Hoang Nam',
    phone: '091607758',
    email: 'duonghoangnam503@gmail.com',
    address: 'Nhà Văn hóa Sinh viên TP.HCM, Lưu Hữu Phước, Đông Hòa, Dĩ An, Bình Dương, Việt Nam',
    point: 100,
    achievements: [
        {
            id: 1,
            serviceName: 'Dọn dẹp nhà cửa',
            amount: 40,
            type: 'giờ',
        },
        {
            id: 2,
            serviceName: 'Giặt ủi',
            amount: 30,
            type: 'lần',
        },
        {
            id: 3,
            serviceName: 'Giao nước',
            amount: 30,
            type: 'lần',
        },
        {
            id: 4,
            serviceName: 'Giao gạo',
            amount: 30,
            type: 'lần',
        },
    ],
};
