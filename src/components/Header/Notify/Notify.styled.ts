import { Menu } from 'antd';
import styled from 'styled-components';
import { theme } from '@/themes';

export const NotifyMenu = styled(Menu)`
    max-height: 68vh;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    width: 400px;
    padding: 0 8px 0 10px;

    &.ant-menu-root.ant-menu {
        border-inline-end: none;
    }

    & .ant-menu-item {
        width: 100%;
        height: 100%;
        margin: 0 0 8px 0;
        padding: 0;

        &.ant-menu-item.ant-menu-item-only-child:hover {
            background-color: ${theme.colors.hoverSecondary};
        }

        &.ant-menu-item-selected {
            background-color: transparent;
        }

        &.ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child:active {
            background-color: ${theme.colors.hoverPrimary};
        }
    }
`;
