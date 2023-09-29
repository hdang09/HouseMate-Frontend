import { Menu as AntMenu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiLogIn, BiPurchaseTagAlt } from 'react-icons/bi';

import Link from '@/components/Link';
import config from '@/config';

import { DrawerStyled } from './Menu.styled';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key?: React.Key | string): MenuItem {
    return {
        label,
        key,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(
        <Link to={config.routes.home}>
            <AiOutlineHome size={20} />
            Home
        </Link>,
        config.routes.home,
    ),
    getItem(
        <Link to={config.routes.shop}>
            <AiOutlineShoppingCart size={20} />
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
        <Link to={config.routes.login}>
            <BiLogIn size={20} />
            Login
        </Link>,
        config.routes.login,
    ),
];

const Menu = () => {
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
            <AiOutlineMenu onClick={showDrawer} size={30} />
            <DrawerStyled title="HouseMate Menu" placement="right" onClose={onClose} open={open}>
                <AntMenu
                    selectedKeys={[location.pathname]}
                    items={items}
                    onClick={handleCloseMenu}
                />
            </DrawerStyled>
        </>
    );
};

export default Menu;
