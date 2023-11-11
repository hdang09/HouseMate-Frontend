import { get, post } from './apiCaller';

import { RcFile } from 'antd/es/upload';

export const getInfoUser = (accountId: number) => {
    return get(`/account/info/${accountId}`);
};

export const getInfoCurrentUser = () => {
    return get(`/account/current`);
};

export const getAllAccount = () => {
    return get('/auth/all');
};

export const uploadAvatar = (userId: number, avatar: RcFile) => {
    let data = new FormData();

    data.append('file', avatar);
    data.append('imageType', 'AVATAR');
    data.append('entityId', userId.toString());

    return post('/upload', data);
};

export const getStaffDetail = (staffId: number) => {
    return get(`/account/staffs/${staffId}`);
};
