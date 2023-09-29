import {
    HomeOutlined,
    LogoutOutlined,
    SkinOutlined,
    TeamOutlined,
    ToolOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom'; // Cannot use Link from '@/components/Link'
import config from '@/config';

const MENU = [
    {
        key: config.routes.admin.home,
        icon: <HomeOutlined />,
        label: (
            <Link to={config.routes.admin.home} rel="noopener noreferrer">
                Home
            </Link>
        ),
    },
    {
        key: config.routes.admin.services,
        icon: <ToolOutlined />,
        label: (
            <Link to={config.routes.admin.services} rel="noopener noreferrer">
                Services
            </Link>
        ),
    },
    {
        key: config.routes.admin.manageStaff,
        icon: <SkinOutlined />,
        label: (
            <Link to={config.routes.admin.manageStaff} rel="noopener noreferrer">
                Staffs
            </Link>
        ),
    },
    {
        key: config.routes.admin.manageCustomer,
        icon: <TeamOutlined />,
        label: (
            <Link to={config.routes.admin.manageCustomer} rel="noopener noreferrer">
                Customers
            </Link>
        ),
    },
    {
        key: config.routes.logout,
        icon: <LogoutOutlined />,
        label: (
            <Link to={config.routes.logout} rel="noopener noreferrer">
                Log out
            </Link>
        ),
    },
];

export default MENU;
