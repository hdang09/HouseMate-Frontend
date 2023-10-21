import { BiBrushAlt, BiSolidBowlRice, BiSolidTShirt, BiWater } from 'react-icons/bi';
import { Purchased, UsageItem } from './PurchasedDetail.types';

import { UnitOfMeasure } from '@/utils/enums';
import serviceImg from '@/assets/images/service-img.webp';

const USAGE: UsageItem[] = [
    {
        id: 1,
        icon: <BiBrushAlt color="orange" />,
        serviceName: 'House cleaning service',
        quantityRemaining: 38,
        quantityPurchased: 40,
        unitOfMeasure: UnitOfMeasure.HOUR,
    },
    {
        id: 2,
        icon: <BiSolidTShirt color="yellow" />,
        serviceName: 'Laundry service',
        quantityRemaining: 38,
        quantityPurchased: 40,
        unitOfMeasure: UnitOfMeasure.KG,
    },
    {
        id: 3,
        icon: <BiWater color="aqua" />,
        serviceName: 'Water delivery service',
        quantityRemaining: 2,
        quantityPurchased: 20,
        unitOfMeasure: UnitOfMeasure.LITER,
    },
    {
        id: 4,
        icon: <BiSolidBowlRice color="orange" />,
        serviceName: 'Rice delivery service',
        quantityRemaining: 38,
        quantityPurchased: 40,
        unitOfMeasure: UnitOfMeasure.KG,
    },
];

export const purchased: Purchased = {
    titleName: 'Mama at home',
    startDate: '15/9/2023',
    endDate: '15/9/2024',
    serviceImg,
    usage: USAGE,
    package: true,
};
