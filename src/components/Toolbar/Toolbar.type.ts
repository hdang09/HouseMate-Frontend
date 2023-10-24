import { MenuProps } from "antd";

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
    menu: MenuProps['items'];
    notifications: NotificationType[];
    cartItems?: number;
    avatar?: string;
};
