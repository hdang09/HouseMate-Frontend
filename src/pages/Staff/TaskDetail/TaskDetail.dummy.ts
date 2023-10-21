import { UserInfoType } from '@/pages/Customer/Checkout/Checkout.type';
import { Role, Status } from '@/utils/enums';

export type TaskDetailType = {
    taskId: number;
    serviceChildrenName: string;
    serviceName: string;
    date: string;
    startTime: string;
    endTime: string;
    status: Status;
    note: string;
    address: string;
};

export const userDummy: UserInfoType = {
    address: 'S205 Vinhome Grand Park, Phường Long Thạnh Mỹ, TP Thủ Đức, TP HCM',
    avatar: '',
    emailAddress: '',
    emailValidationStatus: true,
    fullName: 'Duong Hoang Nam',
    phoneNumber: '0916207758',
    role: Role.CUSTOMER,
    userId: 1,
};

export const dummy: TaskDetailType[] = [
    {
        taskId: 1,
        serviceName: 'Mama at home',
        serviceChildrenName: 'Dọn dẹp nhà cửa',
        date: '2023-10-16T20:47:42',
        startTime: '8:00',
        endTime: '10:00',
        status: Status.DONE,
        note: 'Cần nhân viên tuổi 18+, có ngoại hình, chăm chỉ, đảm đang',
        address:
            'Nhà Văn hóa Sinh viên TP.HCM, Lưu Hữu Phước, Đông Hòa, Dĩ An, Bình Dương, Việt Nam',
    },
];
