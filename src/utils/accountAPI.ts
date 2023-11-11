import { get, post, put, remove } from './apiCaller';

import { Gender, Role } from './enums';
import { RcFile } from 'antd/es/upload';

interface UpdateAccount {
    fullName: string;
    dateOfBirth: Date | string;
    gender: Gender;
    phoneNumber: string;
    role: string;
    identityCard: string;
    email: string;
    address: string;
}

export const getInfoUser = (accountId: number) => {
    return get(`/account/info/${accountId}`);
};

export const getInfoCurrentUser = () => {
    return get(`/account/current`);
};

export const getAllAccount = () => {
    return get('/auth/all');
};

export const banAccount = (userId: number) => {
    return remove(`/account/delete/${userId}`);
};

export const getCustomerDetail = (userId: number, start: string, end: string) => {
    return get(`/account/customers/${userId}`, { start, end });
};

export const uploadAvatar = (userId: number, avatar: RcFile) => {
    let data = new FormData();

    data.append('file', avatar);
    data.append('imageType', 'AVATAR');
    data.append('entityId', userId.toString());

    return post('/upload', data);
};

export const getStaffDetail = (staffId: number, start: string, end: string) => {
    return get(`/account/staffs/${staffId}`, { start, end });
};

export const updateAccountInfo = (accountId: number, updateAccount: UpdateAccount) => {
    return put(`/account/update/${accountId}`, updateAccount);
};

export const updateRole = (userId: number, role: typeof Role) => {
    return put(`/account/role`, {}, { userId, role });
};
