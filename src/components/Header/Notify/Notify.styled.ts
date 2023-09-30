import { Menu } from 'antd';
import styled from 'styled-components';

export const NotifyMenu = styled(Menu)`
    & {
        width: 380px;
    }

    &.ant-menu-root.ant-menu {
        border-inline-end: none;
    }

    & .ant-menu-item {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 16px;
    }
`;
