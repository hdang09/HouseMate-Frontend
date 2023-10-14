export type OrderItem = {
    orderItemId: number;
    orderId: number;
    serviceId: number;
    price: number;
    periodName: string;
    quantity: number;
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
    totalPrice: number;
    listOrderItem: OrderItem[];
    complete: boolean;
};
