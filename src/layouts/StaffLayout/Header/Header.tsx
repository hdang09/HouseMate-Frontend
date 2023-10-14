import { Avatar, Badge, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Notify from '@/components/Notify';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import config from '@/config';
import { useAuth } from '@/hooks';
import Wrapper from '@/layouts/StaffLayout/Wrapper';
import { notifications } from '@/layouts/MainLayout/notifications.dummy';
import MobileMenu from '@/components/Mobile/MobileMenu';

import menu from './Header.menu';
import { HeaderInner, HeaderSection } from './Header.styled';

const Header = () => {
    const { user } = useAuth();

    return (
        <HeaderSection>
            <Wrapper>
                <HeaderInner>
                    <Flex align="end" gap={16}>
                        <Badge count={notifications.length}>
                            <Notify items={notifications} />
                        </Badge>

                        <Link to={config.routes.staff.profile}>
                            {user && user.avatar ? (
                                <Avatar size={40} src={user.avatar} alt="avatar" />
                            ) : (
                                <Avatar size={40} icon={<UserOutlined />} />
                            )}
                        </Link>
                    </Flex>

                    <MobileMenu
                        title={
                            <Flex justify="center">
                                <Logo to={config.routes.staff.newJob} />
                            </Flex>
                        }
                        menu={menu}
                    />
                </HeaderInner>
            </Wrapper>
        </HeaderSection>
    );
};

export default Header;
