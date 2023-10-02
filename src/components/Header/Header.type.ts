import { ItemType } from 'antd/es/menu/hooks/useItems';
import { ToolbarProps } from '@/components/Toolbar/Toolbar.type';

export type MenuType = {
    key: string;
    icon?: JSX.Element;
    label: JSX.Element;
};

// Personal Identifiable Information
export type PIIProps = {
    avatar?: string;
    fullName: string;
};

export type HeaderProps = ToolbarProps & {
    role: string | null; // TODO: Fix remove null later
    navbar: MenuType[];
    menu: ItemType[];
};
