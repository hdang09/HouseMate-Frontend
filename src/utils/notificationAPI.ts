import { get, put } from './apiCaller';

export const getAllNotifications = () => {
    return get(`/notifications`);
};

export const markAsRead = (notificationId: number) => {
    return put(`/notifications/${notificationId}/read`);
};

export const markAllAsRead = () => {
    return put(`/notifications/read-all`);
};
