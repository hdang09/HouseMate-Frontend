import * as Styled from './Toolbar.styled';

import { Avatar, Badge } from 'antd';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import Link from '@/components/Link';
import Notify from '@/components/Notify';
import { ToolbarProps } from './Toolbar.type';
import { UserOutlined } from '@ant-design/icons';
import config from '@/config';
import getAvatar from '@/utils/getAvatar';
import { theme } from '@/themes';

const Toolbar = ({ notifications, cartItems, avatar }: ToolbarProps) => {
    const avatar2 = getAvatar();
    console.log('Avatar: ', avatar2);

    return (
        <Styled.ToolbarAvatarWrapper>
            {notifications && (
                <Badge count={notifications.length}>
                    <Notify items={notifications} />
                </Badge>
            )}

            {cartItems && (
                <Badge count={cartItems}>
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
