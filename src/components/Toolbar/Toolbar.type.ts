import { MenuProps } from 'antd';

export type DataType = {
    taskId: number;
    serviceId: number;
    serviceName: string;
    label: string;
    isRead: boolean;
};

export type NotificationType = {
    notificationId: number;
    userId: number;
    notificationCreatedAt: string;
    isRead: boolean;
    message: string;
    title: string;
    entityId: number;
};

export type ToolbarProps = {
    menu: MenuProps['items'];
    notifications?: NotificationType[];
    cartItems?: number;
    avatar?: string;
    userId?: number;
};
