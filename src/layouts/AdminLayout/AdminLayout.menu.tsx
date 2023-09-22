import { HomeOutlined, ToolOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import config from '@/config';

const MENU = [
    {
        key: '1',
        icon: <HomeOutlined />,
        label: (
            <Link to={config.routes.admin.home} rel="noopener noreferrer">
                Home
            </Link>
        ),
    },
    {
        key: '2',
        icon: <ToolOutlined />,
        label: (
            <Link to={config.routes.admin.services} rel="noopener noreferrer">
                Services
            </Link>
        ),
    },
];

export default MENU;
