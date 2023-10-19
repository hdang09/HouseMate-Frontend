import { get } from './apiCaller';
import { Category, Rating, SaleStatus, SortBy, orderBy } from './enums';

type ServiceParams = {
    keyword: string;
    category?: Category;
    saleStatus?: SaleStatus;
    rating?: Rating;
    sortBy?: SortBy;
    orderBy?: orderBy;
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
