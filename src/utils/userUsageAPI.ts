import { get } from './apiCaller';

export const getSchedule = () => {
    return get(`/user-usage/schedule`);
};

export const getMyPurchased = () => {
    return get(`/user-usage/my-purchased`);
};

export const getPurchasedDetail = (orderItemId: number) => {
    return get(`/user-usage/my-purchased/${orderItemId}`);
};
