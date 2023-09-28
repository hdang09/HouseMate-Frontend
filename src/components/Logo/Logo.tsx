import { Image, Typography } from 'antd';
import logo from '@/assets/svg/logo.svg';
import * as Styled from './Logo.styled';

const { Text } = Typography;

const Logo = ({ to }: { to: string }) => {
    return (
        <Styled.LogoWrapper to={to}>
            <Image src={logo} alt="HouseMate." width={46} height={46} preview={false} />
            <Styled.TitleWrapper>
                <Text>House</Text>
                <Text>Mate</Text>
                <Text>.</Text>
            </Styled.TitleWrapper>
        </Styled.LogoWrapper>
    );
};

export default Logo;
