import { ImageType } from '@/pages/ServiceDetail/ServiceDetail.type';
import { SaleStatus, GroupType } from '@/utils/enums';

export type ServiceType = {
    serviceId: number;
    titleName: string;
    originalPrice: number;
    finalPrice: number;
    unitOfMeasure: string;
    description: string;
    saleStatus: SaleStatus;
    groupType: GroupType;
    avgRating: number;
    numberOfSold: number;
    min: number;
    max: number;
    images: ImageType[];
    package: boolean;
};

export default ServiceType;
