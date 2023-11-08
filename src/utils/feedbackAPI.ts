import { get, post } from './apiCaller';

export const getFeedbackOverview = (serviceId: number) => {
    return get(`/feedback/service/${serviceId}/feedb-oview`);
};

export const getFeedbackList = (serviceId: number) => {
    return get(`/feedback/service/${serviceId}/feedb-list`);
};

export const getFeedbackFilter = (serviceId: number, params: object) => {
    return get(`/feedback/service/${serviceId}/filter`, params);
};

export const getTopFeedback = (params: object) => {
    return get(`/feedback/service/top-feedback`, params);
};

export const createFeedback = (feedback: object) => {
    return post(`/feedback/new`, feedback);
};
