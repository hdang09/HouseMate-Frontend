import { get, post, put, remove } from './apiCaller';
import { Config } from './enums';

export const getInUsedPeriodConfig = () => {
    return get('/period-config/inused');
};

export const getServiceConfig = () => {
    return get('/service-config');
};

export const getServiceConfigByType = (configType: Config) => {
    return get(`/service-config/type`, { configType });
};

export const updatePriceConfig = (configType: object) => {
    return put(`/period-config`, configType);
};

export const updateServiceConfig = (id: number, configType: object) => {
    return put(`/service-config/${id}`, configType);
};

export const createServiceConfig = (configType: object) => {
    return post(`/service-config/new`, configType);
};

export const deleteServiceConfig = (id: number) => {
    return remove(`/service-config/${id}`);
};
