// Data type for table checkout
export interface CheckoutType {
    id: number;
    service: {
        serviceId: number;
        serviceImage: string;
        titleName: string;
    };
    variantName: string;
    quantity: number;
    price: number;
}
