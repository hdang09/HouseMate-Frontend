import { post } from './apiCaller';

export const createPayment = (userInfo: object) => {
    return post('/payment/create', userInfo);
};
