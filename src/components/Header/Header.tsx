import { Col, Image, List, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/svg/logo.svg';
import Container from '@/components/Container';
import Link from '@/components/Link';
import config from '@/config';
import { LinkEnum } from '@/utils/enums';

import * as Styled from './Header.styled';
import navbar, { NavbarType } from './Header.navbar';

const { Text } = Typography;

const Header = () => {
    const navigate = useNavigate();

    return (
        <Styled.Header>
            <Container>
                <Row align="middle" justify="space-between">
                    <Col lg={6} md={12}>
                        <Styled.HeaderLogoWrapper to={config.routes.home}>
                            <Image
                                src={logo}
                                alt="HouseMate."
                                width={46}
                                height={46}
                                preview={false}
                            />
                            <Styled.HeaderTitleWrapper>
                                <Text>House</Text>
                                <Text>Mate</Text>
                                <Text>.</Text>
                            </Styled.HeaderTitleWrapper>
                        </Styled.HeaderLogoWrapper>
                    </Col>

                    <Col lg={14} md={0} sm={0} xs={0}>
                        <Styled.Navbar
                            split={false}
                            dataSource={navbar}
                            renderItem={(item: NavbarType) => (
                                <List.Item key={item.key}>
                                    <Link to={item.key} type={LinkEnum.NAV_LINK} underline scroll>
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
                </Row>
            </Container>
        </Styled.Header>
    );
};

export default Header;
