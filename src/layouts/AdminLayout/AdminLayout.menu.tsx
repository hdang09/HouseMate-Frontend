import {
    CustomerServiceOutlined,
    PieChartOutlined,
    SettingOutlined,
    ShopOutlined,
    TeamOutlined,
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
        config.routes.admin.dashboard,
        <PieChartOutlined />,
    ),

    getItem('Quản lí dịch vụ', 'sub1', <ShopOutlined />, [
        getItem(
            <Link to={config.routes.admin.createSingle} rel="noopener noreferrer">
                Tạo dịch vụ đơn lẻ
            </Link>,
            config.routes.admin.createSingle,
        ),
        getItem(
            <Link to={config.routes.admin.createPackage} rel="noopener noreferrer">
                Tạo gói dịch vụ
            </Link>,
            config.routes.admin.createPackage,
        ),
        getItem(
            <Link to={config.routes.admin.services} rel="noopener noreferrer">
                Danh sách dịch vụ
            </Link>,
            config.routes.admin.services,
        ),
    ]),
    getItem(
        <Link to={config.routes.admin.manageCustomer} rel="noopener noreferrer">
            Quản lí khách hàng
        </Link>,
        config.routes.admin.manageCustomer,
        <CustomerServiceOutlined />,
    ),
    getItem('Quản lí nhân viên', 'sub3', <TeamOutlined />, [
        getItem(
            <Link to={config.routes.admin.manageStaff} rel="noopener noreferrer">
                Danh sách nhân viên
            </Link>,
            config.routes.admin.manageStaff,
        ),
        getItem(
            <Link to={config.routes.admin.createStaff} rel="noopener noreferrer">
                Tạo tài khoản nhân viên
            </Link>,
            config.routes.admin.createStaff,
        ),
    ]),
    getItem('Cài đặt', 'sub4', <SettingOutlined />, [
        getItem(
            <Link to={config.routes.admin.priceSetting} rel="noopener noreferrer">
                Cài đặt tỉ giá
            </Link>,
            config.routes.admin.priceSetting,
        ),
        getItem(
            <Link to={config.routes.admin.unitSetting} rel="noopener noreferrer">
                Cài đặt đơn vị
            </Link>,
            config.routes.admin.unitSetting,
        ),
        getItem(
            <Link to={config.routes.admin.serviceSetting} rel="noopener noreferrer">
                Cài đặt khác
            </Link>,
            config.routes.admin.serviceSetting,
        ),
    ]),
];

export default MENU;
