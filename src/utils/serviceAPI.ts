import { get, post } from './apiCaller';
import { Category, Rating, SaleStatus, SortBy, OrderBy } from './enums';

export type ServiceParams = {
    keyword?: string;
    category?: Category;
    saleStatus?: SaleStatus;
    rating?: Rating;
    sortBy?: SortBy;
    orderBy?: OrderBy;
    page?: number;
    size?: number;
};

export const getServiceById = (serviceId: number) => {
    return get(`/services/${serviceId}`);
};

export const getSimilarService = (category: Category) => {
    return get(`/services`, { category });
};

export const getAllService = (params: ServiceParams) => {
    return get(`/services/search`, params);
};

export const getServiceTopSale = () => {
    return get(`/services/topsale`);
};

export const getSingleService = () => {
    return get(`/services/single`);
};

export const createNewService = (service: object) => {
    return post('/service/new', service);
};

export const getServiceAllKind = (params: ServiceParams) => {
    return get(`/service/all-kind`, params);
};

export const getAllUnit = () => {
    return get(`/service-config`);
};
