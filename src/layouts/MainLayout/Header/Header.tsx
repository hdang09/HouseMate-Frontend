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
import { notifications } from '../notifications.dummy';

import Stomp from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

interface Notification {
    notificationId: number;
    userId: number;
    notificationCreatedAt: string;
    isRead: boolean;
    message: string;
    title: string;
    entityId: number;
}

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
    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
    const [messages, setMessages] = useState<Notification[]>([]);
    console.log(messages);

    useEffect(() => {
        connect();
    }, []);

    function onConnected() {
        console.log('Connected to WebSocket');
        stompClient?.subscribe(`/user/${userId}/queue/notification`, onMessageReceived);
    }

    function onMessageReceived({ body }: { body: string }) {
        console.log(body);

        setMessages((prevMessages) => [...prevMessages, JSON.parse(body)]);
    }

    function connect() {
        let socket = new SockJS('https://housemateb3.thanhf.dev/ws');
        let client = Stomp.over(socket);
        client.connect({}, onConnected);
        setStompClient(client);
    }

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
                                notifications={notifications}
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
                                    <Notify items={notifications} />
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
