import { Avatar, Badge, Flex, Typography, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useLocation, useParams } from 'react-router-dom';

import Notify from '@/components/Notify';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import config from '@/config';
import { useAuth } from '@/hooks';
import Wrapper from '@/layouts/StaffLayout/Wrapper';
import MobileMenu from '@/components/Mobile/MobileMenu';
import { StaffLabelHeader } from '@/utils/enums';

import menu from './Header.menu';
import { HeaderInner, HeaderSection } from './Header.styled';
import { getAllNotifications, markAllAsRead, markAsRead } from '@/utils/notificationAPI';
import { useEffect, useState } from 'react';
import { NotificationType } from '@/components/Toolbar/Toolbar.type';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

const { Text } = Typography;

const Header = () => {
    const [api, contextHolder] = notification.useNotification();
    const [reload, setReload] = useState(0);
    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    const { pathname } = useLocation();
    const { jobId } = useParams();
    const { taskId } = useParams();
    const { user } = useAuth();
    const userId = user?.userId;

    let title: string = '';

    switch (pathname) {
        case config.routes.staff.profile:
            title = StaffLabelHeader.PROFILE;
            break;

        case config.routes.staff.job:
            title = StaffLabelHeader.JOB;
            break;

        case config.routes.staff.job + '/' + jobId:
            title = StaffLabelHeader.JOB_DETAIL;
            break;

        case config.routes.staff.pendingTask:
        case config.routes.staff.incomingTask:
        case config.routes.staff.arrivedTask:
        case config.routes.staff.doingTask:
        case config.routes.staff.doneTask:
        case config.routes.staff.cancelTask:
            title = StaffLabelHeader.TASK;
            break;

        case config.routes.staff.task + '/' + taskId:
            title = StaffLabelHeader.TASK_DETAIL;
            break;

        default:
            break;
    }

    function onMessageReceived({ body }: { body: string }) {
        setNotifications((prev) => [...prev, JSON.parse(body)]);
    }

    // Receive real time notification
    useEffect(() => {
        if (!userId) return;

        // Create a new WebSocket connection and a Stomp client
        const socket = new SockJS(`${config.publicRuntime.API_URL}/ws`);
        const client = Stomp.over(socket);

        // Handle connect
        const onConnect = () => {
            client.subscribe(`/user/${userId}/queue/notification`, onMessageReceived);
        };

        // Handle error
        const onError = (error: any) => {
            console.error('Error when connect: ', error);
        };

        // Connect to the WebSocket server
        try {
            client.connect({}, onConnect, onError);
        } catch (error: any) {
            console.log(error.response ? error.response.data : error.message);
        }

        // Clean up WebSocket connection when component unmounts
        return () => {
            if (client && client.connected) {
                client.disconnect(() => {}, {});
                client.unsubscribe(`/user/${userId}/queue/notification`);
            }
        };
    }, [userId]);

    // Get all notifications
    useEffect(() => {
        (async () => {
            try {
                const { data } = await getAllNotifications();
                setNotifications(data);
            } catch (error: any) {
                api.error({
                    message: 'Lỗi',
                    description: error.response ? error.response.data : error.message,
                });
            }
        })();
    }, [reload]);

    const handleReadAll = async () => {
        await markAllAsRead();
        setReload(reload + 1);
    };

    const handleReadOne = async (notificationId: number) => {
        await markAsRead(notificationId);
        setReload(reload + 1);
    };

    return (
        <>
            {contextHolder}

            <HeaderSection>
                <Wrapper>
                    <HeaderInner>
                        <Text strong>{title}</Text>

                        <Flex align="end" gap={16}>
                            <Badge
                                count={notifications.filter((noti) => !noti.read).length}
                                showZero
                            >
                                <Notify
                                    size={20}
                                    items={[...notifications].reverse()}
                                    handleReadAll={handleReadAll}
                                    handleReadOne={handleReadOne}
                                />
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
                                    <Logo to={config.routes.staff.home} />
                                </Flex>
                            }
                            size={20}
                            menu={menu}
                        />
                    </HeaderInner>
                </Wrapper>
            </HeaderSection>
        </>
    );
};

export default Header;
