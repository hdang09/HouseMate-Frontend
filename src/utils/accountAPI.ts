import { RcFile } from 'antd/es/upload';
import { get, post } from './apiCaller';

export const getInfoUser = (accountId: number) => {
    return get(`/account/info/${accountId}`);
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
