import { Avatar as AvatarAntd, Button, Layout } from 'antd';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '@/themes';

const { Content: ContentAntd } = Layout;

export const WrapperLayout = styled(Layout)`
    width: 100vw;
    height: 100vh;

    aside.ant-layout-sider {
        background-color: ${theme.colors.white};
    }

    .ant-menu {
        max-height: 100vh;
    }
`;

export const Logo = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
    margin-bottom: 25px;
    font-size: 2.2rem;
    font-weight: 700;

    img {
        width: 46px;
        margin-right: 10px;
    }

    span {
        line-height: normal;
    }

    span:first-child():hover {
        color: ${theme.colors.primary};
    }

    span:nth-child(3) {
        color: ${theme.colors.secondary};
    }
`;

export const CollapseBtn = styled(Button)`
    font-size: 1.6rem;
    width: 64px;
    height: 64px;
`;

// TODO: Fix ContentAntd
export const Content = styled(ContentAntd)`
    margin: 24px 16px;
    padding: 24px;
    min-height: 280px;
    background: ${theme.colors.white};
`;

export const Avatar = styled(AvatarAntd)`
    margin: 0 24px;
`;
