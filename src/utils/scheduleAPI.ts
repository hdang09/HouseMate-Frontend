import { get, post } from './apiCaller';

export const getCustomerEvents = () => {
    return get(`/schedule/customer`);
};

export const getCurrentStaffEvents = () => {
    return get(`/schedule/staff`);
};

export const getStaffEventsById = (staffId: number) => {
    return get(`/schedule/staff/${staffId}`);
};

export const getAllPurchased = () => {
    return get('/schedule/all-purchased');
};

// TODO: Fix type of schedule
export const createSchedule = (schedule: object) => {
    return post('/schedule/create', schedule);
};
