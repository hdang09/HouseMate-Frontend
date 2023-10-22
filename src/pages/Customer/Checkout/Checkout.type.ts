import { ServiceType } from '@/components/ServiceList/ServiceItem';

export type OrderItemType = {
    orderItemId: number;
    orderId: number;
    serviceId: number;
    expireDate: string;
    quantity: number;
    finalPrice: number;
    originalPrice: number;
    periodName: string;
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
    transactionId: string;
    transactionDate: string;
    address: string;
    discountPrice: number;
    user: UserInfoType;
    listOrderItem: OrderItemType[];
    complete: boolean;
};
