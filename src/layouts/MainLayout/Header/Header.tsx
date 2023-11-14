import { Badge, Col, Flex, List, Row } from 'antd';
import { MenuProps } from 'antd/lib';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Container from '@/components/Container';
import Logo from '@/components/Logo';
import Notify from '@/components/Notify';
import MobileMenu from '@/components/Mobile/MobileMenu';
import Toolbar from '@/components/Toolbar';
import config from '@/config';
import cookieUtils from '@/utils/cookieUtils';

import { HeaderProps, MenuType } from './Header.type';
import * as Styled from './Header.styled';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { NotificationType } from '@/components/Toolbar/Toolbar.type';

import { getAllNotifications } from '@/utils/notificationAPI';

const items: MenuProps['items'] = [
    {
        label: <Link to={config.routes.customer.profile}>Trang cá nhân</Link>,
        key: config.routes.customer.profile,
    },
    {
        type: 'divider',
    },
    {
        label: (
            <Link
                to={config.routes.public.login}
                onClick={() => cookieUtils.removeItem(config.cookies.token)}
            >
                Đăng xuất
            </Link>
        ),
        key: config.routes.public.login,
    },
];

const Header = ({ role, navbar, menu, cartItems, avatar, userId }: HeaderProps) => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    function onMessageReceived({ body }: { body: string }) {
        setNotifications((prev) => [...prev, JSON.parse(body)]);
    }

    // Receive real time notification
    useEffect(() => {
        if (!userId) return;

        // Create a new WebSocket connection and a Stomp client
        // TODO: Replace https://housemateb3.thanhf.dev with VITE_API_URL
        const socket = new SockJS(`https://housemateb3.thanhf.dev/ws`);
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
        client.connect({}, onConnect, onError);

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
            const { data } = await getAllNotifications();
            setNotifications(data);
        })();
    }, []);

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const transitionNavBar = () => {
        if (window.scrollY > 0) {
            setShow(true);
        } else setShow(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, []);

    return (
        <Styled.Header $isScroll={show}>
            <Container>
                <Row align="middle" justify="space-between">
                    <Col lg={5}>
                        <Logo to={config.routes.public.home} />
                    </Col>

                    <Col lg={15} md={0} sm={0} xs={0}>
                        <Styled.Navbar
                            split={false}
                            dataSource={navbar}
                            renderItem={(item: MenuType) => (
                                <List.Item key={item.key}>{item.label}</List.Item>
                            )}
                        />
                    </Col>

                    {role ? (
                        <Col lg={4} md={0} sm={0} xs={0}>
                            <Toolbar
                                menu={items}
                                notifications={[...notifications].reverse()}
                                cartItems={cartItems}
                                avatar={avatar}
                            />
                        </Col>
                    ) : (
                        <Col lg={4} md={0} sm={0} xs={0}>
                            <Styled.HeaderButton
                                onClick={() => navigate(config.routes.public.login)}
                            >
                                ĐĂNG NHẬP
                            </Styled.HeaderButton>
                        </Col>
                    )}

                    <Col lg={0}>
                        <Flex gap={16}>
                            {role && (
                                <Badge count={notifications.length}>
                                    <Notify items={[...notifications].reverse()} />
                                </Badge>
                            )}

                            <MobileMenu menu={menu} />
                        </Flex>
                    </Col>
                </Row>
            </Container>
        </Styled.Header>
    );
};

export default Header;
