import { Layout as LayoutAntd } from 'antd';
import { SIDEBAR_WIDTH } from '@/utils/constants';
import styled from 'styled-components';
import { theme } from '@/themes';

const { Content: ContentAntd } = LayoutAntd;

export const WrapperLayout = styled(LayoutAntd)`
    height: 100vh;

    aside.ant-layout-sider {
        background-color: ${theme.colors.white};
    }

    .ant-menu {
        max-height: 100vh;
    }
`;

export const Content = styled(ContentAntd)`
    margin: 24px 16px;
    padding: 24px;
    min-height: 280px;
    background: ${theme.colors.white};
`;

export const Layout = styled(LayoutAntd)<{ $isMobile: boolean }>`
    height: fit-content;
    margin-left: ${(props) => (props.$isMobile ? 0 : `${SIDEBAR_WIDTH}px`)};
    transition: ${theme.transition.primary};
`;
