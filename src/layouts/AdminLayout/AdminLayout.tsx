import * as Styled from './AdminLayout.styled';

import { useEffect, useState } from 'react';

import Container from '@/components/Container';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useWindowDimensions } from '@/hooks';

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
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />

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
