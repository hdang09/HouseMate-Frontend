import { get } from './apiCaller';
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
