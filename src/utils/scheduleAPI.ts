import { get, post, put, remove } from './apiCaller';

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

export const getScheduleDetail = (scheduleId: number) => {
    return get(`/schedule/${scheduleId}`);
};

export const getReportScheduleDetail = (taskId: number) => {
    return get(`/tasks/schedule/${taskId}`);
};

export const updateSchedule = (schedule: object, scheduleId: number) => {
    return put(`/schedule/update/${scheduleId}`, schedule);
};

export const cancelSchedule = (scheduleId: number, deleteType: string) => {
    return remove(`/schedule/cancel/${scheduleId}`, {}, { deleteType });
};
