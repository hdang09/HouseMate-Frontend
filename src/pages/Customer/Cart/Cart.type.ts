// Data type for table cart
export interface CartType {
    id: number;
    service: {
        serviceId: number;
        serviceImage: string;
        titleName: string;
    };
    variantId: number;
    quantity: number;
    price: number;
}
