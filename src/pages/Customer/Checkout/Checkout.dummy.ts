import serviceImage from '@/assets/images/service-img.jpg';

import { CheckoutType } from './Checkout.type';

export const checkoutDummy: CheckoutType[] = [
    {
        id: 1,
        service: {
            serviceId: 1,
            serviceImage: serviceImage,
            titleName: 'Mama at home',
        },
        variantName: '3 months',
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
        variantName: '6 months',
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
        variantName: '9 months',
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
        variantName: '3 months',
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
        variantName: '6 months',
        quantity: 3,
        price: 5000,
    },
];
