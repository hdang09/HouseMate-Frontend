import { get } from './apiCaller';

export const getAllPeriod = () => {
    return get('/period/all');
};
