import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Modal, Row } from 'antd';
import * as Styled from '../../Dashboard.styled';
import { TimeRangePickerProps } from 'antd/lib';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { ManageStaffTable } from '@/pages/Admin/ManageStaff/ManageStaff.styled';
import StaffColumns from '@/pages/Admin/ManageStaff/ManageStaff.columns';
import { dummy } from '@/pages/Admin/ManageStaff/ManageStaff.dummy';
import config from '@/config';
import { theme } from '@/themes';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
const { RangePicker } = DatePicker;

const StaffTable = () => {
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();
    const handleDeleteCustomer = async () => {
        console.log('Deleted!');
    };

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

    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    };
    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
    ];
    return (
        <Styled.Wrapper>
            {contextHolder}
            <Row justify={'space-between'} align={'middle'}>
                <Col>
                    <Styled.DashboardTitle level={3}>
                        Top 5 nhân viên tiêu biểu
                    </Styled.DashboardTitle>
                </Col>
                <Col style={{ marginTop: '16px', marginBottom: '32px' }}>
                    <RangePicker presets={rangePresets} onChange={onRangeChange} />
                </Col>
            </Row>
            <ManageStaffTable
                columns={StaffColumns(confirm, handleSearchStaff, true)}
                dataSource={dummy.map((item) => ({ ...item, key: item.id }))}
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
