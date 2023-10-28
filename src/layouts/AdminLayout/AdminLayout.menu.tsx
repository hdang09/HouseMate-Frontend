import {
    CustomerServiceOutlined,
    PieChartOutlined,
    SettingOutlined,
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
    getItem('Quản lí nhân viên', 'sub3', <TeamOutlined />, [
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
        <Link to={config.routes.admin.setting} rel="noopener noreferrer">
            Cài đặt
        </Link>,
        '8',
        <SettingOutlined />,
    ),
];

export default MENU;
