import { Layout } from 'antd';
import styled from 'styled-components';

const { Sider } = Layout;

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

export const LogoWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 16px 0;
`;
