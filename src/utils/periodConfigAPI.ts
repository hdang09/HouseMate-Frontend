import { get } from './apiCaller';

export const getInUsedPeriodConfig = () => {
    return get('/period-config/inused');
};

export const getServiceConfig = () => {
    return get('/service-config');
};
