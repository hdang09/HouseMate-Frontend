import * as Styled from './AdminLayout.styled';

import Logo from '@/components/Logo';
import MENU from './AdminLayout.menu';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { SIDEBAR_WIDTH } from '@/utils/constants';
import config from '@/config';
import { useLocation } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import cookieUtils from '@/utils/cookieUtils';

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
    const location = useLocation();

    return (
        <Styled.Sidebar
            breakpoint="lg"
            collapsedWidth="0"
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={SIDEBAR_WIDTH}
        >
            <Styled.LogoWrapper>
                <Logo to={config.routes.admin.dashboard} role="admin" />
            </Styled.LogoWrapper>

            <Menu mode="inline" selectedKeys={[location.pathname]} items={MENU} />
            <Styled.SignOut onClick={() => cookieUtils.clear()}>
                <LogoutOutlined />
                Đăng Xuất
            </Styled.SignOut>
        </Styled.Sidebar>
    );
};

Sidebar.propTypes = {
    collapsed: PropTypes.bool.isRequired,
};

export default Sidebar;
