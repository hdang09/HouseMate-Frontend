import CustomerColumns from '@/pages/Admin/ManageCustomer/ManageCustomer.columns';
import { dummy } from '@/pages/Admin/ManageCustomer/ManageCustomer.dummy';
import { ManageCustomerTable } from '@/pages/Admin/ManageCustomer/ManageCustomer.styled';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Modal, Row } from 'antd';
import * as Styled from '../../Dashboard.styled';
import { TimeRangePickerProps } from 'antd/lib';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { theme } from '@/themes';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import config from '@/config';
import { useEffect, useState } from 'react';
import { ExportToExcel } from '../Excel/ExportCustomer';
const { RangePicker } = DatePicker;
import fallbackImage from '@/assets/images/fallback-img.png';
import { CustomerColumnType } from '@/pages/Admin/ManageCustomer/ManageCustomer.type';
const CustomerTable = () => {
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

    const handleSearchCustomer = (selectedKeys: string[]) => {
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

    const [data, setData] = useState<CustomerColumnType[]>([]);
    const fileName = 'Danh sách khách hàng'; // here enter filename for your excel file

    useEffect(() => {
        const data = [
            {
                id: 1,
                customerAvatar: fallbackImage,
                customerName: 'Dương Hoàng Nam',
                numberOfSchedule: 90,
                amountSpent: 1000000,
                numberOfTransactions: 3,
                date: '12-10-2023',
            },
            {
                id: 2,
                customerAvatar: fallbackImage,
                customerName: 'Lâm Thị Ngọc Hân',
                numberOfSchedule: 80,
                amountSpent: 1000000,
                numberOfTransactions: 5,
                date: '12-10-2023',
            },
            {
                id: 3,
                customerAvatar: fallbackImage,
                customerName: 'Trần Hải Đăng',
                numberOfSchedule: 100,
                amountSpent: 1000000,
                numberOfTransactions: 6,
                date: '12-10-2023',
            },
            {
                id: 4,
                customerAvatar: fallbackImage,
                customerName: 'Nguyễn Hoàng Anh',
                numberOfSchedule: 100,
                amountSpent: 1000000,
                numberOfTransactions: 7,
                date: '12-10-2023',
            },
            {
                id: 5,
                customerAvatar: fallbackImage,
                customerName: 'Trần Tấn Thành',
                numberOfSchedule: 100,
                amountSpent: 1000000,
                numberOfTransactions: 5,
                date: '12-10-2023',
            },
        ];

        setData(data);
    }, []);

    return (
        <Styled.Wrapper>
            {contextHolder}
            <ExportToExcel apiData={data} fileName={fileName} />
            <Row justify={'space-between'} align={'middle'}>
                <Col>
                    <Styled.DashboardTitle level={3}>
                        Danh sách khách hàng gần đây
                    </Styled.DashboardTitle>
                </Col>
                <Col style={{ marginTop: '16px', marginBottom: '32px' }}>
                    <RangePicker presets={rangePresets} onChange={onRangeChange} />
                </Col>
            </Row>
            <ManageCustomerTable
                columns={CustomerColumns(confirm, handleSearchCustomer, true)}
                dataSource={dummy.map((item) => ({ ...item, key: item.id }))}
                pagination={false}
                scroll={{ x: 100 }}
            />
            <Row justify={'end'} style={{ marginTop: '16px' }}>
                <Button
                    onClick={() => navigate(config.routes.admin.manageCustomer)}
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

export default CustomerTable;
