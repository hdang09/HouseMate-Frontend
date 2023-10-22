import { ServiceType } from '@/components/ServiceList/ServiceItem';

export type SortType = {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
};

export type PageAbleType = {
    pageNumber: number;
    pageSize: number;
    sort: SortType;
    offset: number;
    paged: boolean;
    unpaged: boolean;
};

export type ShopType = {
    content: ServiceType[];
    pageable: PageAbleType;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: SortType;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
};
