// * This file will be deleted if we have data from API

import { SaleStatus, UnitOfMeasure } from '@/utils/enums';
import { ServiceType } from './ServiceItem';
import serviceImg from '@/assets/images/service-img.jpg';

// * This is just a dummy data
const services: ServiceType[] = [
    {
        serviceId: 1,
        titleName: 'Cleaning service',
        avgRating: 4.8,
        numberOfSold: 1300,
        numberOfFeedback: 400,
        originalPrice: 1500,
        salePrice: 100,
        period: [
            {
                id: 1,
                value: '3 months',
                price: 3000,
            },
            {
                id: 2,
                value: '6 months',
                price: 5500,
            },
            {
                id: 3,
                value: '1 year',
                price: 11000,
            },
        ],
        imageUrl: [
            serviceImg,
            'https://scontent.fsgn13-3.fna.fbcdn.net/v/t1.6435-9/72546531_809482682816401_7056446742648061952_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7a1959&_nc_ohc=0Fw47I1etCkAX_sANWx&_nc_ht=scontent.fsgn13-3.fna&oh=00_AfAnsON8FNWP8P6IgqXu1tVcKhHvUVNFxIxwYN_9cHH1Zg&oe=6548DBC4',
            serviceImg,
            serviceImg,
            serviceImg,
        ],
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam praesentium quod placeat ratione aliquam culpa, qui enim corporis asperiores sunt eum doloremque ducimus unde autem architecto, perferendis a eos amet.',
        unitOfMeasure: UnitOfMeasure.HOUR,
        saleStatus: SaleStatus.NOT_AVAILABLE,
        isPackage: false,
    },
    {
        serviceId: 2,
        titleName: 'Laundry',
        avgRating: 4.8,
        numberOfSold: 1300,
        numberOfFeedback: 400,
        originalPrice: 1500,
        salePrice: 100,
        period: [
            {
                id: 1,
                value: '3 months',
                price: 3000,
            },
            {
                id: 2,
                value: '6 months',
                price: 5500,
            },
            {
                id: 3,
                value: '1 year',
                price: 11000,
            },
        ],
        imageUrl: [serviceImg, serviceImg, serviceImg, serviceImg, serviceImg],
        description: '',
        unitOfMeasure: UnitOfMeasure.KG,
        saleStatus: SaleStatus.NOT_AVAILABLE,
        isPackage: false,
    },
    {
        serviceId: 3,
        titleName: 'Water delivery',
        avgRating: 4.8,
        numberOfSold: 1300,
        numberOfFeedback: 400,
        originalPrice: 1500,
        salePrice: 100,
        period: [
            {
                id: 1,
                value: '3 months',
                price: 3000,
            },
            {
                id: 2,
                value: '6 months',
                price: 5500,
            },
            {
                id: 3,
                value: '1 year',
                price: 11000,
            },
        ],
        imageUrl: [serviceImg, serviceImg, serviceImg, serviceImg, serviceImg],
        description: '',
        unitOfMeasure: UnitOfMeasure.LITER,
        saleStatus: SaleStatus.NOT_AVAILABLE,
        isPackage: false,
    },
    {
        serviceId: 4,
        titleName: 'Rice delivery',
        avgRating: 4.8,
        numberOfSold: 1300,
        numberOfFeedback: 400,
        originalPrice: 1500,
        salePrice: 100,
        period: [
            {
                id: 1,
                value: '3 months',
                price: 3000,
            },
            {
                id: 2,
                value: '6 months',
                price: 5500,
            },
            {
                id: 3,
                value: '1 year',
                price: 11000,
            },
        ],
        imageUrl: [serviceImg, serviceImg, serviceImg, serviceImg, serviceImg],
        description: '',
        unitOfMeasure: UnitOfMeasure.TIME,
        saleStatus: SaleStatus.NOT_AVAILABLE,
        isPackage: false,
    },
    {
        serviceId: 5,
        titleName: 'Mama at home',
        avgRating: 5,
        numberOfSold: 1300,
        numberOfFeedback: 400,
        originalPrice: 1500,
        salePrice: 100,
        period: [
            {
                id: 1,
                value: '3 months',
                price: 3000,
            },
            {
                id: 2,
                value: '6 months',
                price: 5500,
            },
            {
                id: 3,
                value: '1 year',
                price: 11000,
            },
        ],
        imageUrl: [serviceImg, serviceImg, serviceImg, serviceImg, serviceImg],
        description: '',
        unitOfMeasure: UnitOfMeasure.COMBO,
        saleStatus: SaleStatus.NOT_AVAILABLE,
        isPackage: false,
    },
    {
        serviceId: 6,
        titleName: 'Mama at home',
        avgRating: 5,
        numberOfSold: 1300,
        numberOfFeedback: 400,
        originalPrice: 1500,
        salePrice: 100,
        period: [
            {
                id: 1,
                value: '3 months',
                price: 3000,
            },
            {
                id: 2,
                value: '6 months',
                price: 5500,
            },
            {
                id: 3,
                value: '1 year',
                price: 11000,
            },
        ],
        imageUrl: [serviceImg, serviceImg, serviceImg, serviceImg, serviceImg],
        description: '',
        unitOfMeasure: UnitOfMeasure.COMBO,
        saleStatus: SaleStatus.NOT_AVAILABLE,
        isPackage: false,
    },
    {
        serviceId: 7,
        titleName: 'Mama at home',
        avgRating: 5,
        numberOfSold: 1300,
        numberOfFeedback: 400,
        originalPrice: 1500,
        salePrice: 100,
        period: [
            {
                id: 1,
                value: '3 months',
                price: 3000,
            },
            {
                id: 2,
                value: '6 months',
                price: 5500,
            },
            {
                id: 3,
                value: '1 year',
                price: 11000,
            },
        ],
        imageUrl: [serviceImg, serviceImg, serviceImg, serviceImg, serviceImg],
        description: '',
        unitOfMeasure: UnitOfMeasure.COMBO,
        saleStatus: SaleStatus.NOT_AVAILABLE,
        isPackage: false,
    },
    {
        serviceId: 8,
        titleName: 'Mama at home',
        avgRating: 5,
        numberOfSold: 1300,
        numberOfFeedback: 400,
        originalPrice: 1500,
        salePrice: 100,
        period: [
            {
                id: 1,
                value: '3 months',
                price: 3000,
            },
            {
                id: 2,
                value: '6 months',
                price: 5500,
            },
            {
                id: 3,
                value: '1 year',
                price: 11000,
            },
        ],
        imageUrl: [serviceImg, serviceImg, serviceImg, serviceImg, serviceImg],
        description: '',
        unitOfMeasure: UnitOfMeasure.COMBO,
        saleStatus: SaleStatus.NOT_AVAILABLE,
        isPackage: false,
    },
    {
        serviceId: 9,
        titleName: 'Mama at home',
        avgRating: 5,
        numberOfSold: 1300,
        numberOfFeedback: 400,
        originalPrice: 1500,
        salePrice: 100,
        period: [
            {
                id: 1,
                value: '3 months',
                price: 3000,
            },
            {
                id: 2,
                value: '6 months',
                price: 5500,
            },
            {
                id: 3,
                value: '1 year',
                price: 11000,
            },
        ],
        imageUrl: [serviceImg, serviceImg, serviceImg, serviceImg, serviceImg],
        description: '',
        unitOfMeasure: UnitOfMeasure.COMBO,
        saleStatus: SaleStatus.NOT_AVAILABLE,
        isPackage: false,
    },
    {
        serviceId: 10,
        titleName: 'Mama at home',
        avgRating: 5,
        numberOfSold: 1300,
        numberOfFeedback: 400,
        originalPrice: 1500,
        salePrice: 100,
        period: [
            {
                id: 1,
                value: '3 months',
                price: 3000,
            },
            {
                id: 2,
                value: '6 months',
                price: 5500,
            },
            {
                id: 3,
                value: '1 year',
                price: 11000,
            },
        ],
        imageUrl: [serviceImg, serviceImg, serviceImg, serviceImg, serviceImg],
        description: '',
        unitOfMeasure: UnitOfMeasure.COMBO,
        saleStatus: SaleStatus.NOT_AVAILABLE,
        isPackage: false,
    },
];

export default services;