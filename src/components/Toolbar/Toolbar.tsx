import { Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import Link from '@/components/Link';
import Notify from '@/components/Notify';
import config from '@/config';
import { theme } from '@/themes';

import * as Styled from './Toolbar.styled';
import { ToolbarProps } from './Toolbar.type';

const Toolbar = ({ notifications, cartItems = -1, avatar }: ToolbarProps) => {
    return (
        <Styled.ToolbarAvatarWrapper>
            {notifications && (
                <Badge count={notifications.length}>
                    <Notify items={notifications} />
                </Badge>
            )}

            {cartItems >= 0 && (
                <Badge showZero count={cartItems}>
                    <Link to={config.routes.customer.cart}>
                        <AiOutlineShoppingCart
                            size={28}
                            color={theme.colors.textPrimary}
                            cursor="pointer"
                        />
                    </Link>
                </Badge>
            )}

            <Link to={config.routes.customer.profile}>
                {avatar ? (
                    <Avatar size={40} src={avatar} alt="avatar" />
                ) : (
                    <Avatar size={40} icon={<UserOutlined />} />
                )}
            </Link>
        </Styled.ToolbarAvatarWrapper>
    );
};

export default Toolbar;
