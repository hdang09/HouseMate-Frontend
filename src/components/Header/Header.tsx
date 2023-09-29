import { Col, List, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';
import { LinkEnum } from '@/utils/enums';

import * as Styled from './Header.styled';
import navbar, { NavbarType } from './Header.navbar';
import Logo from '@/components/Logo';
import Menu from './Menu';

const Header = () => {
    const navigate = useNavigate();

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

                    <Col lg={4} md={0} sm={0} xs={0}>
                        <Styled.HeaderButton onClick={() => navigate(config.routes.login)}>
                            LOGIN
                        </Styled.HeaderButton>
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
