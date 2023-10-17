import { get } from './apiCaller';

export const getEvents = () => {
    return get(`/schedule`);
};
