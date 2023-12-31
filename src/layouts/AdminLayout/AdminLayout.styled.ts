import {
    Avatar as AvatarAntd,
    Badge as BadgeAntd,
    Button,
    Layout as LayoutAntd,
    Breadcrumb as BreadcrumbAntd,
} from 'antd';

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

        a {
            font-weight: 400;
        }
    }

    .ant-layout-content {
        background-color: ${theme.colors.adminBackground};
    }
`;

export const CollapseBtn = styled(Button)`
    font-size: 1.6rem;
`;

export const LogoWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 16px 24px;
`;

export const Content = styled(ContentAntd)`
    padding: 24px;
    min-height: 280px;
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

    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: ${theme.colors.shadowCart} 0px 17px 55px 0px;
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

export const Breadcrumb = styled(BreadcrumbAntd)`
    li:last-child .ant-breadcrumb-link a {
        color: ${theme.colors.primary};
    }
`;

export const SignOut = styled.button`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 20px;
    padding-left: 24px;
    background-color: transparent;
    color: ${theme.colors.textPrimary};
    border: none;
    cursor: pointer;

    span {
        margin-right: 10px;
    }

    &:hover {
        color: ${theme.colors.error};
    }
`;
