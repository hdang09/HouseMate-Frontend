import { theme } from '@/themes';
import { Drawer } from 'antd';
import styled from 'styled-components';

export const DrawerStyled = styled(Drawer)`
    & .ant-drawer-body {
        padding: 0;
    }

    & .ant-menu-item {
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
    }

    & .ant-menu-title-content {
        display: flex;
        height: 100%;
    }

    & a {
        display: flex;
        align-items: center;

        column-gap: 10px;
        padding: 20px 24px;
        width: 100%;
        color: ${theme.colors.textPrimary};
        font-size: 1.7rem;
        font-weight: 500;
        line-height: 1;
    }
`;
