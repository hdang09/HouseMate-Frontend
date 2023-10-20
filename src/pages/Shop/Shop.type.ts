import { ServiceType } from '@/components/ServiceList/ServiceItem';

export type SortType = {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
};

export type PageAbleType = {
    pageNumber: number;
    pageSize: number;
    sort: SortType;
    offset: number;
    unpaged: boolean;
    paged: boolean;
};

export type ShopType = {
    content: ServiceType[];
    pageable: PageAbleType;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: SortType;
    empty: boolean;
};
