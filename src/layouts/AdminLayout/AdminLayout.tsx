import * as St from './AdminLayout.styled';

import { Layout, Menu, Row, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import MENU from './AdminLayout.menu';
import { Outlet } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import config from '@/config';
import logo from '@/assets/svg/logo.svg';
import { useWindowDimensions } from '@/hooks';

const { Header, Sider, Content } = Layout;

const MOBILE = 570;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { width } = useWindowDimensions();

    useEffect(() => {
        if (width < MOBILE) setCollapsed(true);
        else setCollapsed(false);
    }, [width < MOBILE]);

    return (
        <St.WrapperLayout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={250}
            >
                <St.Logo to={config.routes.admin.home}>
                    <img src={logo} alt="HouseMate Logo" />
                    <span>House</span>
                    <span>Mate</span>
                </St.Logo>

                <Menu mode="inline" defaultSelectedKeys={['1']} items={MENU} />
            </Sider>

            <Layout style={{ height: 'fit-content' }}>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Row justify="space-between" align="middle">
                        <St.CollapseBtn
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                        />

                        <St.Avatar icon={<UserOutlined />} />
                    </Row>
                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </St.WrapperLayout>
    );
};

AdminLayout.propTypes = {};

export default AdminLayout;
