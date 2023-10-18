import { get } from './apiCaller';

export const getServiceById = (serviceId: number) => {
    return get(`/services/${serviceId}`);
};
