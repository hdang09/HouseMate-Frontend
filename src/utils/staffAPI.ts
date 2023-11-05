import { get, post } from './apiCaller';
import { TaskStatus } from './enums';

export type Params = {
    taskStatus?: TaskStatus;
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

export const getTasksByStatus = (param: Params) => {
    return get(`/tasks/staff`, param);
};
