// Data type for table cart
export interface CartType {
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
