import * as Styled from './AdminLayout.styled';

import { Link, useLocation, useParams } from 'react-router-dom';
import { Row, Typography } from 'antd';
import { useAppDispatch, useAuth } from '@/hooks';

import Container from '@/components/Container';
import config from '@/config';
import headerSlice from './slice';
import { useEffect } from 'react';

const { Text } = Typography;

let breadcrumbNameMap = {
    [config.routes.admin.dashboard]: 'Tổng quan',
    [config.routes.admin.profile]: 'Hồ sơ',
    [config.routes.admin.createSingle]: 'Tạo dịch vụ đơn lẻ',
    [config.routes.admin.createPackage]: 'Tạo gói dịch vụ',
    [config.routes.admin.services]: 'Danh sách dịch vụ',
    [config.routes.admin.manageCustomer]: 'Quản lý khách hàng',
    [config.routes.admin.manageStaff]: 'Danh sách nhân viên',
    [config.routes.admin.createStaff]: 'Tạo hồ sơ nhân viên',
    [config.routes.admin.priceSetting]: 'Cài đặt tỉ giá',
    [config.routes.admin.unitSetting]: 'Cài đặt đơn vị',
    [config.routes.admin.serviceSetting]: 'Cài đặt khác',
};

const Header = () => {
    let { id } = useParams();
    const dispatch = useAppDispatch();
    breadcrumbNameMap[`${config.routes.admin.services}/${id}`] = `Chi tiết dịch vụ`;
    breadcrumbNameMap[`${config.routes.admin.manageCustomer}/${id}`] = `Chi tiết khách hàng`;
    breadcrumbNameMap[`${config.routes.admin.manageStaff}/${id}`] = `Chi tiết nhân viên`;

    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return {
            key: url,
            title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
        };
    });

    useEffect(() => {
        const url = `/${pathSnippets.slice(0, pathSnippets.length).join('/')}`;
        dispatch(headerSlice.actions.changeTitle(breadcrumbNameMap[url] || 'Tổng quan'));
    }, [location]);

    const { user } = useAuth();

    return (
        <Styled.Header>
            <Container>
                <Row justify="space-between" align="middle">
                    <Styled.Breadcrumb items={extraBreadcrumbItems} />

                    <Styled.RightContent>
                        <Styled.Avatar src={user?.avatar} />
                        <Text strong>{user?.fullName}</Text>
                    </Styled.RightContent>
                </Row>
            </Container>
        </Styled.Header>
    );
};

Header.propTypes = {};

export default Header;
