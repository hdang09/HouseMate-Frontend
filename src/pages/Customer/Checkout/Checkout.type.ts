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

export type UserInfoType = {
    userId: number;
    role: string;
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    emailValidationStatus: boolean;
    avatar: string;
    address: string;
};

// Data type for table checkout
export type CheckoutType = {
    orderId: number;
    userId: number;
    date: string;
    paymentMethod: string;
    finalPrice: number;
    subTotal: number;
    discountPrice: number;
    user: UserInfoType;
    listOrderItem: OrderItemType[];
    complete: boolean;
};
