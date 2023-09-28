import * as Styled from './AdminLayout.styled';

import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

import Container from '@/components/Container';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useWindowDimensions } from '@/hooks';

const { Text } = Typography;

const MOBILE = 570;

const AdminLayout = () => {
    // Collapsed menu
    const [collapsed, setCollapsed] = useState(false);

    // Responsive
    const { width } = useWindowDimensions();
    useEffect(() => {
        if (width < MOBILE) setCollapsed(true);
        else setCollapsed(false);
    }, [width < MOBILE]);

    return (
        <Styled.WrapperLayout hasSider>
            <Sidebar collapsed={collapsed} />

            <Styled.Layout $isMobile={collapsed}>
                <Styled.Header>
                    <Container>
                        <Row justify="space-between" align="middle">
                            <Styled.CollapseBtn
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                            />

                            <Styled.RightContent>
                                <Styled.Badge count={5}>
                                    <BellOutlined />
                                </Styled.Badge>

                                <Styled.Avatar src="https://wegotthiscovered.com/wp-content/uploads/2023/07/Happy-Independence-Day-5.png?w=1200" />
                                <Text strong>Tran Hai Dang</Text>
                            </Styled.RightContent>
                        </Row>
                    </Container>
                </Styled.Header>

                <Styled.Content>
                    <Container>
                        <Outlet />
                    </Container>
                </Styled.Content>
            </Styled.Layout>
        </Styled.WrapperLayout>
    );
};

AdminLayout.propTypes = {};

export default AdminLayout;
