import { Avatar, Divider, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
    AiOutlineHome,
    AiOutlineLogin,
    AiOutlineLogout,
    AiOutlineShopping,
    AiOutlineShoppingCart,
} from 'react-icons/ai';
import { BiPurchaseTagAlt } from 'react-icons/bi';

import Link from '@/components/Link';
import config from '@/config';
import cookieUtils from '@/utils/cookieUtils';
import { LinkEnum } from '@/utils/enums';

import { PIIProps, MenuType } from './Header.type';
import { HeaderAvatarWrapper, NavbarLink } from './Header.styled';

const { Text } = Typography;

/* ==================== Menu ==================== */
const createMenuItem = (
    key: string,
    icon: JSX.Element,
    title: string,
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
) => ({
    key: key,
    label: (
        <Link to={key} onClick={onClick}>
            {icon}
            {title}
        </Link>
    ),
});

export const menuUnLogged = () => {
    const menu: MenuType[] = [
        createMenuItem(config.routes.public.home, <AiOutlineHome size={20} />, 'Home'),
        createMenuItem(config.routes.public.shop, <AiOutlineShopping size={20} />, 'Shop'),
        createMenuItem(
            config.routes.customer.purchased,
            <BiPurchaseTagAlt size={20} />,
            'My Purchased',
        ),
        createMenuItem(config.routes.public.login, <AiOutlineLogin size={20} />, 'Login'),
    ];

    return menu;
};

export const menuLogged = (user: PIIProps) => {
    const handleLogout = () => {
        cookieUtils.removeItem(config.cookies.token);
    };

    const menu: MenuType[] = [
        {
            key: config.routes.customer.profile,
            label: (
                <HeaderAvatarWrapper>
                    <Link to={config.routes.customer.profile}>
                        {user.avatar ? (
                            <Avatar size={90} src={user.avatar} alt={user.fullName} />
                        ) : (
                            <Avatar size={90} icon={<UserOutlined />} />
                        )}
                    </Link>
                    <Text>{user.fullName}</Text>
                    <Divider />
                </HeaderAvatarWrapper>
            ),
        },

        ...menuUnLogged().slice(0, -1),

        createMenuItem(config.routes.customer.cart, <AiOutlineShoppingCart size={20} />, 'My Cart'),
        createMenuItem(
            config.routes.public.login,
            <AiOutlineLogout size={20} />,
            'Logout',
            handleLogout,
        ),
    ];

    return menu;
};

/* ==================== Navbar ==================== */
const navbarProps = {
    type: LinkEnum.NAV_LINK,
    underline: true,
    scroll: true,
};

const createNavbarItem = (key: string, title: string) => ({
    key: key,
    label: (
        <NavbarLink to={key} {...navbarProps}>
            {title}
        </NavbarLink>
    ),
});

export const navbar: MenuType[] = [
    createNavbarItem(config.routes.public.home, 'Home'),
    createNavbarItem(config.routes.public.shop, 'Shop'),
    createNavbarItem(config.routes.customer.purchased, 'My Purchased'),
];
