import { Avatar, Badge, Button, Col, List, Popover, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';

import user from '@/assets/images/user-img.jpg';
import Container from '@/components/Container';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import config from '@/config';
import { theme } from '@/themes';
import { LinkEnum } from '@/utils/enums';

import navbar, { NavbarType } from './Header.navbar';
import * as Styled from './Header.styled';
import Menu from './Menu';
import Notify from './Notify';

const { Text } = Typography;

const Header = () => {
    // const navigate = useNavigate();

    return (
        <Styled.Header>
            <Container>
                <Row align="middle" justify="space-between">
                    <Col lg={6}>
                        <Logo to={config.routes.home} />
                    </Col>

                    <Col lg={14} md={0} sm={0} xs={0}>
                        <Styled.Navbar
                            split={false}
                            dataSource={navbar}
                            renderItem={(item: NavbarType) => (
                                <List.Item key={item.key}>
                                    <Link to={item.to} type={LinkEnum.NAV_LINK} underline scroll>
                                        {({ isActive }: any) => (
                                            <Styled.NavbarLink $isActive={isActive}>
                                                {item.label}
                                            </Styled.NavbarLink>
                                        )}
                                    </Link>
                                </List.Item>
                            )}
                        />
                    </Col>

                    {/* <Col lg={4} md={0} sm={0} xs={0}>
                        <Styled.HeaderButton onClick={() => navigate(config.routes.login)}>
                            LOGIN
                        </Styled.HeaderButton>
                    </Col> */}

                    <Col lg={4} md={0} sm={0} xs={0}>
                        <Styled.HeaderAvatarWrapper>
                            <Badge count={3}>
                                <Popover
                                    content={Notify}
                                    title={
                                        <Styled.HeaderPopoverTitleWrapper>
                                            <Text>Notifications</Text>
                                            <Button>Mark all as read</Button>
                                        </Styled.HeaderPopoverTitleWrapper>
                                    }
                                    trigger="click"
                                    overlayInnerStyle={{
                                        padding: '12px 0',
                                    }}
                                >
                                    <>
                                        <IoMdNotificationsOutline
                                            size={28}
                                            color={theme.colors.textPrimary}
                                            cursor="pointer"
                                        />
                                    </>
                                </Popover>
                            </Badge>

                            <Badge count={5}>
                                <Link to={config.routes.cart}>
                                    <AiOutlineShoppingCart
                                        size={28}
                                        color={theme.colors.textPrimary}
                                        cursor="pointer"
                                    />
                                </Link>
                            </Badge>

                            <Link to={config.routes.profile}>
                                <Avatar size={40} src={<img src={user} alt="avatar" />} />
                            </Link>
                        </Styled.HeaderAvatarWrapper>
                    </Col>

                    <Col lg={0}>
                        <Menu />
                    </Col>
                </Row>
            </Container>
        </Styled.Header>
    );
};

export default Header;
