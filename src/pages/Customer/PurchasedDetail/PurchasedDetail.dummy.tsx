import { BiBrushAlt, BiSolidBowlRice, BiSolidTShirt, BiWater } from 'react-icons/bi';
import { Event, Purchased, UsageItem } from './PurchasedDetail.types';
import { Service, Status, UnitOfMeasure } from '@/utils/enums';

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

const EVENTS: Event[] = [
    {
        title: Service.CLEANING,
        start: new Date(2023, 9, 8, 7, 0),
        end: new Date(2023, 9, 8, 9, 0),
        status: Status.DONE,
        staff: 'Duong Hoang Nam',
        phone: '0866 123 456',
    },
    {
        title: Service.WATER,
        start: new Date(2023, 9, 8, 16, 0),
        end: new Date(2023, 9, 8, 18, 0),
        status: Status.DONE,
        staff: 'Duong Hoang Nam',
        phone: '0866 123 456',
    },
    {
        title: Service.RICE,
        start: new Date(2023, 9, 9, 9, 0),
        end: new Date(2023, 9, 9, 10, 0),
        status: Status.CANCEL,
        staff: 'Duong Hoang Nam',
        phone: '0866 123 456',
    },
    {
        title: Service.LAUNDRY,
        start: new Date(2023, 9, 9, 14, 0),
        end: new Date(2023, 9, 9, 15, 0),
        status: Status.DONE,
        staff: 'Duong Hoang Nam',
        phone: '0866 123 456',
    },
    {
        title: Service.LAUNDRY,
        start: new Date(2023, 9, 10, 11, 0),
        end: new Date(2023, 9, 10, 13, 0),
        status: Status.INCOMING,
        staff: 'Duong Hoang Nam',
        phone: '0866 123 456',
    },
    {
        title: Service.LAUNDRY,
        start: new Date(2023, 9, 11, 9, 0),
        end: new Date(2023, 9, 11, 11, 0),
        status: Status.INCOMING,
        staff: 'Duong Hoang Nam',
        phone: '0866 123 456',
    },
    {
        title: Service.LAUNDRY,
        start: new Date(2023, 9, 12, 7, 0),
        end: new Date(2023, 9, 12, 9, 0),
        status: Status.PENDING,
        staff: 'Duong Hoang Nam',
        phone: '0866 123 456',
    },
    {
        title: Service.LAUNDRY,
        start: new Date(2023, 9, 12, 12, 0),
        end: new Date(2023, 9, 12, 14, 0),
        status: Status.PROCESSING,
        staff: 'Duong Hoang Nam',
        phone: '0866 123 456',
    },
];

export const purchased: Purchased = {
    titleName: 'Mama at home',
    startDate: '15/9/2023',
    endDate: '15/9/2024',
    serviceImg,
    usage: USAGE,
    events: EVENTS,
    package: true,
};
