import {
    CustomerServiceOutlined,
    LogoutOutlined,
    PieChartOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom'; // Cannot use Link from '@/components/Link'
import config from '@/config';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const MENU = [
    getItem(
        <Link to={config.routes.admin.dashboard} rel="noopener noreferrer">
            Tổng quan
        </Link>,
        '1',
        <PieChartOutlined />,
    ),
    getItem(
        <Link to={config.routes.admin.profile} rel="noopener noreferrer">
            Hồ sơ
        </Link>,
        '2',
        <UserOutlined />,
    ),
    getItem('Quản lí dịch vụ', 'sub1', <ShopOutlined />, [
        getItem(
            <Link to={config.routes.admin.createSingle} rel="noopener noreferrer">
                Tạo dịch vụ đơn lẻ
            </Link>,
            '3',
        ),
        getItem(
            <Link to={config.routes.admin.createPackage} rel="noopener noreferrer">
                Tạo gói dịch vụ
            </Link>,
            '4',
        ),
        getItem(
            <Link to={config.routes.admin.services} rel="noopener noreferrer">
                Danh sách dịch vụ
            </Link>,
            '5',
        ),
    ]),
    getItem(
        <Link to={config.routes.admin.manageCustomer} rel="noopener noreferrer">
            Quản lí khách hàng
        </Link>,
        'sub2',
        <CustomerServiceOutlined />,
    ),
    getItem('Quản lí nhân viên', 'sub2', <TeamOutlined />, [
        getItem(
            <Link to={config.routes.admin.manageStaff} rel="noopener noreferrer">
                Danh sách nhân viên
            </Link>,
            '6',
        ),
        getItem(
            <Link to={config.routes.admin.manageStaff} rel="noopener noreferrer">
                Tạo tài khoản nhân viên
            </Link>,
            '7',
        ),
    ]),
    getItem(
        <Link to={config.routes.public.login} rel="noopener noreferrer">
            Đăng xuất
        </Link>,
        '8',
        <LogoutOutlined />,
    ),
    // {
    //     key: config.routes.admin.home,
    //     icon: <HomeOutlined />,
    //     label: (
    //         <Link to={config.routes.admin.home} rel="noopener noreferrer">
    //             Tổng quan
    //         </Link>
    //     ),
    // },
    // {
    //     key: config.routes.admin.services,
    //     icon: <ToolOutlined />,
    // label: (
    //     <Link to={config.routes.admin.services} rel="noopener noreferrer">
    //         Hồ sơ
    //     </Link>
    // ),
    // },
    // {
    //     key: config.routes.admin.manageStaff,
    //     icon: <SkinOutlined />,
    //     label: (
    //         <Link to={config.routes.admin.manageStaff} rel="noopener noreferrer">
    //             Quản li
    //         </Link>
    //     ),
    // },
    // {
    //     key: config.routes.admin.manageCustomer,
    //     icon: <TeamOutlined />,
    //     label: (
    //         <Link to={config.routes.admin.manageCustomer} rel="noopener noreferrer">
    //             Customers
    //         </Link>
    //     ),
    // },
    // {
    //     key: config.routes.public.login,
    //     icon: <LogoutOutlined />,
    //     label: (
    //         <Link to={config.routes.public.login} rel="noopener noreferrer">
    //             Log out
    //         </Link>
    //     ),
    // },
];

export default MENU;
