import { get } from './apiCaller';
import { ConfigType } from './enums';

export const getInUsedPeriodConfig = () => {
    return get('/period-config/inused');
};

export const getServiceConfig = () => {
    return get('/service-config');
};

export const getServiceConfigByType = (configType: ConfigType) => {
    return get(`/service-config/{type}`, { configType });
};
