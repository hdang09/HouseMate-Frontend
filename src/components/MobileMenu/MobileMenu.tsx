import { Menu as AntMenu, Avatar, Divider, Typography } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiLogOut, BiPurchaseTagAlt } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsShop } from 'react-icons/bs';

import user from '@/assets/images/user-img.jpg';
import Link from '@/components/Link';
import config from '@/config';

import { AvatarWrapper, DrawerStyled } from './MobileMenu.styled';

type MenuItem = Required<MenuProps>['items'][number];

const { Text } = Typography;

function getItem(label: React.ReactNode, key?: React.Key | string): MenuItem {
    return {
        label,
        key,
    } as MenuItem;
}

// TODO: Handle authentication
// const unLogged: MenuItem[] = [
//     getItem(
//         <Link to={config.routes.home}>
//             <AiOutlineHome size={20} />
//             Home
//         </Link>,
//         config.routes.home,
//     ),
//     getItem(
//         <Link to={config.routes.shop}>
//             <AiOutlineShoppingCart size={20} />
//             Shop
//         </Link>,
//         config.routes.shop,
//     ),
//     getItem(
//         <Link to={config.routes.purchased}>
//             <BiPurchaseTagAlt size={20} />
//             My Purchased
//         </Link>,
//         config.routes.purchased,
//     ),
//     getItem(
//         <Link to={config.routes.login}>
//             <BiLogIn size={20} />
//             Login
//         </Link>,
//         config.routes.login,
//     ),
// ];

const logged: MenuItem[] = [
    getItem(
        <AvatarWrapper>
            <Link to={config.routes.profile}>
                <Avatar size={90} src={<img src={user} alt="avatar" />} />
            </Link>
            <Text>Lam Thi Ngoc Han</Text>
            <Divider />
        </AvatarWrapper>,
        config.routes.profile,
    ),
    getItem(
        <Link to={config.routes.home}>
            <AiOutlineHome size={20} />
            Home
        </Link>,
        config.routes.home,
    ),
    getItem(
        <Link to={config.routes.shop}>
            <BsShop size={20} />
            Shop
        </Link>,
        config.routes.shop,
    ),
    getItem(
        <Link to={config.routes.purchased}>
            <BiPurchaseTagAlt size={20} />
            My Purchased
        </Link>,
        config.routes.purchased,
    ),
    getItem(
        <Link to="">
            <IoMdNotificationsOutline size={20} />
            Notifications
        </Link>,
        '',
    ),
    getItem(
        <Link to={config.routes.cart}>
            <AiOutlineShoppingCart size={20} />
            My Cart
        </Link>,
        config.routes.cart,
    ),
    getItem(
        <Link to={config.routes.logout}>
            <BiLogOut size={20} />
            Logout
        </Link>,
        config.routes.logout,
    ),
];

const MobileMenu = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleCloseMenu = () => {
        setOpen(false);
    };

    return (
        <>
            <AiOutlineMenu onClick={showDrawer} size={30} cursor="pointer" />
            <DrawerStyled title="HouseMate Menu" placement="right" onClose={onClose} open={open}>
                <AntMenu
                    selectedKeys={[location.pathname]}
                    items={logged}
                    onClick={handleCloseMenu}
                />
            </DrawerStyled>
        </>
    );
};

export default MobileMenu;
