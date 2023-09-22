import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import config from '@/config';

const MENU = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: (
            <Link to={config.routes.admin.home} rel="noopener noreferrer">
                Home
            </Link>
        ),
    },
    {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: (
            <Link to={config.routes.admin.services} rel="noopener noreferrer">
                Services
            </Link>
        ),
    },
];

export default MENU;
