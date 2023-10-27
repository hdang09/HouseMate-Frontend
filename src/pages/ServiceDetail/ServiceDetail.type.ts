import { ServiceType } from '@/components/ServiceList/ServiceItem';
import { ImageEnum } from '@/utils/enums';

export type ImageType = {
    imageId: number;
    imageUrl: string;
    userId: number;
    entityId: number;
    imageType: ImageEnum;
};

export type PriceListType = {
    periodId: number;
    serviceId: number;
    periodValue: number;
    periodName: string;
    originalPrice: number;
    finalPrice: number;
};

export type PackageListItemType = {
    packageServiceId: number;
    singleServiceId: number;
    quantity: number;
    service: ServiceType;
    typeList: TypeListType[];
};

export type TypeListType = {
    serviceTypeId: number;
    serviceId: number;
    typeName: string;
};

export interface ServiceDetailItem extends ServiceType {
    numberOfReview: number;
    numberOfComment: number;
}

export type ServiceDetailType = {
    service: ServiceDetailItem;
    typeList?: TypeListType[];
    packageServiceItemList?: PackageListItemType[];
    priceList: PriceListType[];
};
