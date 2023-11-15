import { ServiceType } from '@/components/ServiceList/ServiceItem';
import { PriceListType } from '@/pages/ServiceDetail/ServiceDetail.type';
import { PageAbleType, SortType } from '@/pages/Shop/Shop.type';

export type ServiceItemType = {
    service: ServiceType;
    priceList: PriceListType[];
};

export type DataType = {
    content: ServiceItemType[];
    pageable: PageAbleType;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: SortType;
    empty: boolean;
};
