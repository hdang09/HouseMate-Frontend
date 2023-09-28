import { post } from './apiCaller';

export const register = (account: object) => {
    return post('/auth/register', account);
};

export const login = (account: object) => {
    return post('/auth/login', account);
};
