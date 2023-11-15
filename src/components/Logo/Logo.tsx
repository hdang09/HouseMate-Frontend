import { Image, Typography } from 'antd';
import logo from '@/assets/svg/logo.svg';
import * as Styled from './Logo.styled';

const { Text } = Typography;

const Logo = ({ to, role }: { to: string; role?: string }) => {
    return (
        <Styled.LogoWrapper to={to}>
            <Image src={logo} alt="HouseMate." width={36} height={36} preview={false} />
            <Styled.TitleWrapper role={role || ''}>
                <Text>House</Text>
                <Text>Mate</Text>
            </Styled.TitleWrapper>
        </Styled.LogoWrapper>
    );
};

export default Logo;
