import { CheckoutType } from './Checkout.type';

import serviceImage from '@/assets/images/service-img.jpg';

export const checkoutDummy: CheckoutType[] = [
    {
        id: 1,
        service: {
            serviceId: 1,
            serviceImage: serviceImage,
            serviceName: 'Mama at home',
        },
        variant: {
            variantId: 1,
            variantName: '3 months',
        },
        quantity: 3,
        price: 300000,
    },
    {
        id: 2,
        service: {
            serviceId: 2,
            serviceImage: serviceImage,
            serviceName: 'Cleaning House',
        },
        variant: {
            variantId: 2,
            variantName: '6 months',
        },
        quantity: 3,
        price: 50000,
    },
    {
        id: 3,
        service: {
            serviceId: 3,
            serviceImage: serviceImage,
            serviceName: 'Laundry',
        },
        variant: {
            variantId: 3,
            variantName: '12 months',
        },
        quantity: 3,
        price: 5000,
    },
    {
        id: 4,
        service: {
            serviceId: 3,
            serviceImage: serviceImage,
            serviceName: 'Laundry',
        },
        variant: {
            variantId: 3,
            variantName: '12 months',
        },
        quantity: 3,
        price: 5000,
    },
    {
        id: 5,
        service: {
            serviceId: 3,
            serviceImage: serviceImage,
            serviceName: 'Laundry',
        },
        variant: {
            variantId: 3,
            variantName: '12 months',
        },
        quantity: 3,
        price: 5000,
    },
];
