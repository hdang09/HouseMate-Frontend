export type DataType = {
    taskId: number;
    serviceId: number;
    serviceName: string;
    label: string;
    isRead: boolean;
};

export type NotificationType = {
    notificationId: number;
    notificationTitle: string;
    date: string;
    data: DataType;
};

export type ToolbarProps = {
    notifications: NotificationType[];
    cartItems?: number;
    avatar?: string;
};
