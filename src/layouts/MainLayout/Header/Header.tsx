import { Badge, Col, List, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import Container from '@/components/Container';
import Logo from '@/components/Logo';
import Notify from '@/components/Notify';
import MobileMenu from '@/components/Mobile/MobileMenu';
import Toolbar from '@/components/Toolbar';
import config from '@/config';

import { HeaderProps, MenuType } from './Header.type';
import * as Styled from './Header.styled';

const Header = ({ role, navbar, menu, notifications, cartItems, avatar }: HeaderProps) => {
    const navigate = useNavigate();

    return (
        <Styled.Header>
            <Container>
                <Row align="middle" justify="space-between">
                    <Col lg={6}>
                        <Logo to={config.routes.public.home} />
                    </Col>

                    <Col lg={14} md={0} sm={0} xs={0}>
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
                                LOGIN
                            </Styled.HeaderButton>
                        </Col>
                    )}

                    <Col lg={0}>
                        {role && (
                            <Badge count={notifications.length}>
                                <Notify items={notifications} />
                            </Badge>
                        )}

                        <MobileMenu menu={menu} />
                    </Col>
                </Row>
            </Container>
        </Styled.Header>
    );
};

export default Header;
