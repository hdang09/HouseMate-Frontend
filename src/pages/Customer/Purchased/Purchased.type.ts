import { Category } from '@/utils/enums';

type PurchasedType = {
    image: string;
    serviceName: string;
    dateStart: string;
    dateEnd: string;
    type: Category;
    own: string[];
};

export default PurchasedType;
