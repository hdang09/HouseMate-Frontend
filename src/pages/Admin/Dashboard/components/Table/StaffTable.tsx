import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row } from 'antd';
import * as Styled from '../../Dashboard.styled';

import { ManageStaffTable } from '@/pages/Admin/ManageStaff/ManageStaff.styled';
import StaffColumns from '@/pages/Admin/ManageStaff/ManageStaff.columns';
import config from '@/config';
import { theme } from '@/themes';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getStaffTable } from '@/utils/dashboardAPI';
import { StaffColumnType } from '@/pages/Admin/ManageStaff/ManageStaff.type';
import { ExportToExcel } from '../Excel/ExportCustomer';

const StaffTable = () => {
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();
    const [staffList, setStaffList] = useState<StaffColumnType[]>([]);
    const handleDeleteCustomer = async () => {
        console.log('Deleted!');
    };
    const fileName = 'Danh sách nhân viên';
    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn có muốn cấm tài khoản người dùng này?',
            icon: <ExclamationCircleOutlined />,
            content:
                'Tài khoản người dùng sau khi bị xóa sẽ bị ẩn khỏi hệ thống và ngưng các hoạt động.',
            okText: 'Quay lại',
            onCancel: handleDeleteCustomer,
            cancelText: 'Xác nhận',
        });
    };

    const handleSearchStaff = (selectedKeys: string[]) => {
        const data = selectedKeys.toString().trim();
        console.log(data);
    };

    const getStaffList = async () => {
        const { data }: { data: any } = await getStaffTable();
        setStaffList(data);
    };

    useEffect(() => {
        getStaffList();
    }, []);

    return (
        <Styled.Wrapper>
            {contextHolder}
            <Row justify={'space-between'} align={'middle'} style={{ marginBottom: '12px' }}>
                <Col>
                    <Styled.DashboardTitle level={3}>
                        Top 5 nhân viên tiêu biểu
                    </Styled.DashboardTitle>
                </Col>
                <Row justify={'end'} style={{ marginTop: '12px' }}>
                    <ExportToExcel apiData={staffList} fileName={fileName} />
                </Row>
            </Row>
            <ManageStaffTable
                columns={StaffColumns(confirm, handleSearchStaff, true)}
                dataSource={staffList.slice(0, 5)?.map((item) => ({ ...item, key: item.id }))}
                pagination={false}
                scroll={{ x: 200 }}
            />

            <Row justify={'end'} style={{ marginTop: '16px' }}>
                <Button
                    onClick={() => navigate(config.routes.admin.manageStaff)}
                    type="text"
                    style={{
                        color: theme.colors.primary,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    Xem chi tiết
                    <BsArrowRight size={18} style={{ marginLeft: '10px' }} />
                </Button>
            </Row>
        </Styled.Wrapper>
    );
};

export default StaffTable;
