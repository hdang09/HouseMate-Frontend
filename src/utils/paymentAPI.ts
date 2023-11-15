import { get, post } from './apiCaller';

export const createPayment = (userInfo: object) => {
    return post('/payment/create', userInfo);
};

export const checkVNPayPayment = (params: string) => {
    return get(`/payment/check/vnpay${params}`);
};

export const checkMoMoPayment = (params: string) => {
    return get(`/payment/check/momo${params}`);
};
