import { get } from './apiCaller';

export const getInfoUser = (accountId: number) => {
    return get(`/account/info/${accountId}`);
};

export const getAllAccount = () => {
    return get('/auth/all');
};
