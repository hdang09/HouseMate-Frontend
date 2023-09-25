import { Image, List, Typography } from 'antd';

import logo from '@/assets/svg/logo.svg';
import config from '@/config';
import Container from '@/components/Container';

import * as Styled from './Header.styled';
import { NavLink } from 'react-router-dom';
import navbar, { NavbarType } from './Header.navbar';

const { Text } = Typography;

const Header = () => {
    return (
        <Container>
            <Styled.Header align="center">
                <Styled.HeaderLogoWrapper to={config.routes.home}>
                    <Image src={logo} alt="HouseMate" width={46} height={41} preview={false} />

                    <Styled.HeaderLogoText>
                        <Text>House</Text>
                        <Text>Mate</Text>
                        <Text>.</Text>
                    </Styled.HeaderLogoText>
                </Styled.HeaderLogoWrapper>

                <Styled.Navbar
                    split={false}
                    dataSource={navbar}
                    renderItem={(item: NavbarType) => (
                        <List.Item key={item.key}>
                            <NavLink to={item.key}>
                                {({ isActive }) => (
                                    <Styled.NavbarLink $isActive={isActive}>
                                        {item.label}
                                    </Styled.NavbarLink>
                                )}
                            </NavLink>
                        </List.Item>
                    )}
                />

                <Styled.HeaderButton>LOGIN</Styled.HeaderButton>
            </Styled.Header>
        </Container>
    );
};

export default Header;
