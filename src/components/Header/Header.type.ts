import { ItemType } from 'antd/es/menu/hooks/useItems';
import { NotificationType } from '@/components/Toolbar/Toolbar.type';

export type MenuType = {
    key: string;
    icon?: JSX.Element;
    label: JSX.Element | string;
};

// Personal Identifiable Information
export type PIIProps = {
    avatar: string;
    fullName: string;
};

export type HeaderProps = {
    role: string | null;
    navbar: MenuType[];
    menu: ItemType[];
    notifications: NotificationType[];
    cartItems?: number;
    avatar: string;
};
