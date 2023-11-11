import CustomerColumns from '@/pages/Admin/ManageCustomer/ManageCustomer.columns';
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
import { CustomerColumnType } from '@/pages/Admin/ManageCustomer/ManageCustomer.type';
import { getCustomerTable } from '@/utils/dashboardAPI';
const CustomerTable = () => {
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();
    const handleDeleteCustomer = async () => {
        console.log('Deleted!');
    };

    const [startDate, setStartDate] = useState<Dayjs>(dayjs().add(-7, 'd'));
    const endDate = dayjs();

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

    const onRangeChange = (dates: null | (Dayjs | null)[], _: string[]) => {
        if (dates) {
            setStartDate(dates[0] || startDate);
            getCustomerData(dates[0] || startDate);
        }
    };
    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: '7 ngày trước', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: '14 ngày trước', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: '30 ngày trước', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: '90 ngày trước', value: [dayjs().add(-90, 'd'), dayjs()] },
    ];

    const [data, setData] = useState<CustomerColumnType[]>([]);
    const [exportData, setExportData] = useState<CustomerColumnType[]>([]);
    const fileName = 'Danh sách khách hàng'; // here enter filename for your excel file
    const getCustomerData = async (startDate: Dayjs) => {
        try {
            const body = {
                startDate: startDate,
                endDate: endDate,
                size: 5,
                page: 1,
            };

            const { data }: { data: any } = await getCustomerTable(body, {});

            setData(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const disabledEndDate = (current: Dayjs) => {
        // Disable dates after today for the end date
        return current && current > dayjs().endOf('day');
    };

    useEffect(() => {
        getCustomerData(startDate);
        const getAllCustomerData = async () => {
            try {
                const body = {
                    size: 99,
                    page: 1,
                };
                const { data }: { data: any } = await getCustomerTable(body, {});
                setExportData(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllCustomerData();
    }, []);

    return (
        <Styled.Wrapper>
            {contextHolder}

            <Row justify={'space-between'} align={'middle'}>
                <Col>
                    <Styled.DashboardTitle level={3}>
                        Danh sách khách hàng gần đây
                    </Styled.DashboardTitle>
                </Col>
                <Col style={{ marginTop: '16px', marginBottom: '32px' }}>
                    <Col>
                        <RangePicker
                            format={'DD/MM/YYYY'}
                            presets={rangePresets}
                            onChange={onRangeChange}
                            disabledDate={disabledEndDate}
                            value={[startDate, endDate]}
                        />
                    </Col>
                    <Row justify={'end'} style={{ marginTop: '12px' }}>
                        <ExportToExcel apiData={exportData} fileName={fileName} />
                    </Row>
                </Col>
            </Row>

            <ManageCustomerTable
                columns={CustomerColumns(confirm, handleSearchCustomer, true)}
                dataSource={data.map((item) => ({ ...item, key: item.userId }))}
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
