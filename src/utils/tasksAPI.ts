import { get, post } from './apiCaller';

export type Params = {
    page?: number;
    size?: number;
};

export const getTaskPending = (params: Params) => {
    return get(`/tasks/tasks-pending-application`, params);
};

export const getTaskById = (id: number) => {
    return get(`/tasks/${id}`);
};

export const applyTask = (id: number) => {
    return post(`/tasks/${id}/staff/application`);
};
