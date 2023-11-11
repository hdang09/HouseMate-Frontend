import { get, post, remove } from './apiCaller';

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
