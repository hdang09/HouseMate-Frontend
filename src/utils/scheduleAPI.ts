import { get, post } from './apiCaller';

export const getEvents = () => {
    return get(`/schedule`);
};

export const getStaffEventsById = (staffId: number) => {
    return get(`/schedule/staff/${staffId}`);
};

export const getAllPurchased = () => {
    return get('/schedule/all-purchased');
};

export const createSchedule = (schedule: object) => {
    return post('/schedule/create', schedule);
};
