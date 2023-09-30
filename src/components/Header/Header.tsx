import { Col, List, Row } from 'antd';

// Dummy
import user from '@/assets/images/user-img.jpg';

import Container from '@/components/Container';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import MobileMenu from '@/components/MobileMenu';
import Toolbar from '@/components/Toolbar';
import config from '@/config';
import { LinkEnum } from '@/utils/enums';

import navbar, { NavbarType } from './Header.navbar';
import { dummy } from './Header.notifications';
import * as Styled from './Header.styled';

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

                    {/* TODO: Check authentication */}
                    {/* <Col lg={4} md={0} sm={0} xs={0}>
                        <Styled.HeaderButton onClick={() => navigate(config.routes.login)}>
                            LOGIN
                        </Styled.HeaderButton>
                    </Col> */}

                    <Col lg={4} md={0} sm={0} xs={0}>
                        <Toolbar notifications={dummy} avatar={user} />
                    </Col>

                    <Col lg={0}>
                        <MobileMenu />
                    </Col>
                </Row>
            </Container>
        </Styled.Header>
    );
};

export default Header;
