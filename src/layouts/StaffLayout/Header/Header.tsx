import { Avatar, Badge, Flex, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useLocation, useParams } from 'react-router-dom';

import Notify from '@/components/Notify';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import config from '@/config';
import { useAuth } from '@/hooks';
import Wrapper from '@/layouts/StaffLayout/Wrapper';
import { notifications } from '@/layouts/MainLayout/notifications.dummy';
import MobileMenu from '@/components/Mobile/MobileMenu';
import { StaffLabelHeader } from '@/utils/enums';

import menu from './Header.menu';
import { HeaderInner, HeaderSection } from './Header.styled';

const { Text } = Typography;

const Header = () => {
    const { pathname } = useLocation();
    const { jobId } = useParams();
    const { user } = useAuth();

    let title: string = '';

    switch (pathname) {
        case config.routes.staff.newJob:
        case config.routes.staff.waitingConfirmJob:
        case config.routes.staff.confirmedJob:
            title = StaffLabelHeader.JOB;
            break;

        case config.routes.staff.job + '/' + jobId:
            title = StaffLabelHeader.JOB_DETAIL;
            break;

        case config.routes.staff.incomingTask:
        case config.routes.staff.doneTask:
        case config.routes.staff.pendingTask:
            title = StaffLabelHeader.TASK;
            break;

        default:
            break;
    }

    return (
        <HeaderSection>
            <Wrapper>
                <HeaderInner>
                    <Text strong>{title}</Text>

                    <Flex align="end" gap={16}>
                        <Badge count={notifications.length}>
                            <Notify size={20} items={notifications} />
                        </Badge>

                        <Link to={config.routes.staff.profile}>
                            {user && user.avatar ? (
                                <Avatar size={30} src={user.avatar} alt="avatar" />
                            ) : (
                                <Avatar size={30} icon={<UserOutlined />} />
                            )}
                        </Link>
                    </Flex>

                    <MobileMenu
                        title={
                            <Flex justify="center">
                                <Logo to={config.routes.staff.newJob} />
                            </Flex>
                        }
                        size={20}
                        menu={menu}
                    />
                </HeaderInner>
            </Wrapper>
        </HeaderSection>
    );
};

export default Header;
