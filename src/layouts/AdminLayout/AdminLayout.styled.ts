import { Avatar as AvatarAntd, Badge as BadgeAntd, Button, Layout as LayoutAntd } from 'antd';

import { SIDEBAR_WIDTH } from '@/utils/constants';
import styled from 'styled-components';
import { theme } from '@/themes';

const { Content: ContentAntd, Header: HeaderAntd, Sider } = LayoutAntd;

export const WrapperLayout = styled(LayoutAntd)`
    height: 100vh;

    aside.ant-layout-sider {
        background-color: ${theme.colors.white};
    }

    .ant-menu {
        max-height: 100vh;
    }
`;

export const CollapseBtn = styled(Button)`
    font-size: 1.6rem;
`;

export const LogoWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 16px 0;
`;

export const Content = styled(ContentAntd)`
    margin: 24px 16px;
    padding: 24px;
    min-height: 280px;
    background: ${theme.colors.white};
`;

export const Badge = styled(BadgeAntd)`
    margin: 0 24px;
    font-size: 2rem;
    cursor: pointer;
`;

export const Avatar = styled(AvatarAntd)`
    margin-right: 6px;
`;

export const Layout = styled(LayoutAntd)<{ $isMobile: boolean }>`
    height: fit-content;
    margin-left: ${(props) => (props.$isMobile ? 0 : `${SIDEBAR_WIDTH}px`)};
    transition: ${theme.transition.primary};
`;

export const Header = styled(HeaderAntd)`
    padding: 0;
    background-color: ${theme.colors.white};
    display: flex;
    align-items: center;
`;

export const RightContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Sidebar = styled(Sider)`
    &.ant-layout-sider {
        overflow: auto;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
    }
`;