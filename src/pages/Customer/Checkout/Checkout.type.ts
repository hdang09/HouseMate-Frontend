export type ServiceType = {
    serviceId: number;
    originalPrice: number;
    finalPrice: number;
    titleName: string;
    numberOfSold: number;
    image: string;
};

export type OrderItemType = {
    orderItemId: number;
    orderId: number;
    serviceId: number;
    periodName: string;
    quantity: number;
    finalPrice: number;
    originalPrice: number;
    discountPrice: number;
    service: ServiceType;
};

// Data type for table checkout
export type CheckoutType = {
    orderId: number;
    userId: number;
    date: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    paymentMethod: string;
    finalPrice: number;
    subTotal: number;
    discountPrice: number;
    listOrderItem: OrderItemType[];
    complete: boolean;
};

export type UserInfoType = {
    fullName: string;
    email: string;
    phone: string;
    address: string;
};
