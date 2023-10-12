import { CartType } from './Cart.type';

import serviceImage from '@/assets/images/service-img.jpg';

export const cartDummy: CartType[] = [
    {
        id: 1,
        service: {
            serviceId: 1,
            serviceImage: serviceImage,
            titleName: 'Mama at home',
        },
        variantId: 1,
        quantity: 3,
        price: 300000,
    },
    {
        id: 2,
        service: {
            serviceId: 2,
            serviceImage: serviceImage,
            titleName: 'Cleaning House',
        },
        variantId: 2,
        quantity: 3,
        price: 50000,
    },
    {
        id: 3,
        service: {
            serviceId: 3,
            serviceImage: serviceImage,
            titleName: 'Laundry',
        },
        variantId: 3,
        quantity: 3,
        price: 5000,
    },
    {
        id: 4,
        service: {
            serviceId: 3,
            serviceImage: serviceImage,
            titleName: 'Laundry',
        },
        variantId: 3,
        quantity: 3,
        price: 5000,
    },
    {
        id: 5,
        service: {
            serviceId: 3,
            serviceImage: serviceImage,
            titleName: 'Laundry',
        },
        variantId: 3,
        quantity: 3,
        price: 5000,
    },
];
