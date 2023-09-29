import { SaleStatus } from '@/utils/enums';

type ServiceType = {
    id: number;
    titleName: string;
    unitOfMeasure?: string;
    oldPrice: number;
    salePrice: number;
    description?: string;
    saleStatus: SaleStatus;
    rating: number;
    creatorId?: number;
    totalSold: number;
    createdAt?: Date;
};

export default ServiceType;
