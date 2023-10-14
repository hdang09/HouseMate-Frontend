// Data type for table cart
export type CartDataType = {
    subTotal: number;
    total: number;
};

// export type CartType = {
//     id: number;
//     service: {
//         serviceId: number;
//         serviceImage: string;
//         serviceName: string;
//     };
//     variant: {
//         variantId: number;
//         variantName: string;
//     };
//     quantity: number;
//     price: number;
// };

export type ServiceType = {
    serviceId: number;
    originalPrice: number;
    finalPrice: number;
    titleName: string;
    numberOfSold: number;
    image: string;
    package: boolean;
};

export type CartType = {
    cartId: number;
    serviceId: number;
    quantity: number;
    price: number;
    periodId: number;
    service: ServiceType;
};
