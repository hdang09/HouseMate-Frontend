import * as Styled from './AdminLayout.styled';

import { BellOutlined } from '@ant-design/icons';
import { Row, Typography } from 'antd';

import Container from '@/components/Container';
import config from '@/config';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/hooks';
import { useEffect } from 'react';
import headerSlice from './slice';

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
    [config.routes.admin.setting]: 'Cài đặt',
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

    return (
        <Styled.Header>
            <Container>
                <Row justify="space-between" align="middle">
                    <Styled.Breadcrumb items={extraBreadcrumbItems} />

                    <Styled.RightContent>
                        <Styled.Badge count={5}>
                            <BellOutlined />
                        </Styled.Badge>

                        <Styled.Avatar src="https://wegotthiscovered.com/wp-content/uploads/2023/07/Happy-Independence-Day-5.png?w=1200" />
                        <Text strong>Administrator</Text>
                    </Styled.RightContent>
                </Row>
            </Container>
        </Styled.Header>
    );
};

Header.propTypes = {};

export default Header;
