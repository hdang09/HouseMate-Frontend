import { Menu as AntMenu, MenuProps } from 'antd';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';

import { DrawerStyled } from './MobileMenu.styled';

const MobileMenu = ({ menu }: { menu: MenuProps['items'] }) => {
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
            <AiOutlineMenu
                onClick={showDrawer}
                size={30}
                cursor="pointer"
                style={{
                    marginLeft: '16px',
                }}
            />
            <DrawerStyled title="HouseMate Menu" placement="right" onClose={onClose} open={open}>
                <AntMenu
                    selectedKeys={[location.pathname]}
                    items={menu}
                    onClick={handleCloseMenu}
                />
            </DrawerStyled>
        </>
    );
};

export default MobileMenu;
