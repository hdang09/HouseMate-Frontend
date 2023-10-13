// Data type for table cart
export type CartDataType = {
    selectedRowKeys: React.Key[];
    subTotal: number;
    total: number;
};

export type CartType = {
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
};
