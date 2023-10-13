// Data type for table checkout
export interface CheckoutType {
    id: number;
    service: {
        serviceId: number;
        serviceImage: string;
        serviceName: string;
    };
    variant: {
        variantId: number;
        variantName: string;
    };
    quantity: number;
    price: number;
}
