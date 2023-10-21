import { get, post } from './apiCaller';

export const getEvents = () => {
    return get(`/schedule`);
};

export const getAllPurchased = () => {
    return get('/schedule/all-purchased');
};

// TODO: Fix type of 3 schedule
export const createReturnSchedule = (schedule: object) => {
    return post('/schedule/create/return', schedule);
};

export const createDeliverySchedule = (schedule: object) => {
    return post('/schedule/create/delivery', schedule);
};

export const createHourlySchedule = (schedule: object) => {
    return post('/schedule/create/hourly', schedule);
};
