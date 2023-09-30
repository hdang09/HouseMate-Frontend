import { Avatar, Badge } from 'antd';

import { AiOutlineShoppingCart } from 'react-icons/ai';

import Link from '@/components/Link';
import Notify from '@/components/Notify';
import config from '@/config';
import { theme } from '@/themes';

import * as Styled from './Toolbar.styled';
import { ToolbarProps } from './Toolbar.type';

const Toolbar = ({ notifications, cartItems, avatar }: ToolbarProps) => {
    return (
        <Styled.ToolbarAvatarWrapper>
            {notifications && (
                <Badge count={notifications.length}>
                    <Notify items={notifications} />
                </Badge>
            )}

            {cartItems && (
                <Badge count={cartItems}>
                    <Link to={config.routes.cart}>
                        <AiOutlineShoppingCart
                            size={28}
                            color={theme.colors.textPrimary}
                            cursor="pointer"
                        />
                    </Link>
                </Badge>
            )}

            <Link to={config.routes.profile}>
                <Avatar size={40} src={<img src={avatar} alt="avatar" />} />
            </Link>
        </Styled.ToolbarAvatarWrapper>
    );
};

export default Toolbar;
