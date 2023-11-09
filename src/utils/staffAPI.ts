import { get, post, remove } from './apiCaller';
import { OrderBy, TaskStatus } from './enums';

export type Params = {
    taskStatus?: TaskStatus;
    directionSort?: OrderBy;
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

export const reportTask = (taskId: number, taskReportType: TaskStatus, groupReturn?: object) => {
    return post(`/tasks/${taskId}/staff/reports`, groupReturn, { taskReportType });
};

export const cancelTask = (scheduleId: number) => {
    return remove(`/tasks/cancel/schedule/${scheduleId}`);
};
