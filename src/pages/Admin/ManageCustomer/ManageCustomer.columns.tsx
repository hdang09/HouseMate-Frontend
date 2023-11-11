import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import config from '@/config';
import getColumnSearchProps from './ManageCustomer.search';
import { CustomerColumnType } from './ManageCustomer.type';
import { CustomerActions, CustomerText } from './ManageCustomer.styled';

const CustomerColumns = (
    confirm: (userId: number) => void,
    handleSearch: (selectedKeys: string[]) => void,
    isDashboard: boolean,
) => {
    const navigate = useNavigate();

    const columns: ColumnsType<CustomerColumnType> = [
        {
            title: 'Tên khách hàng',
            ...getColumnSearchProps(handleSearch),
        },
        {
            title: 'Số lịch đã đặt',
            render: (record: CustomerColumnType) => (
                <CustomerText>{record.numberOfSchedule}</CustomerText>
            ),
        },
        {
            key: 'sortTotalOrderPrice',
            title: 'Số chi tiêu',
            sorter: true,
            render: (record: CustomerColumnType) => (
                <CustomerText>{record.amountSpent.toLocaleString() + 'đ'}</CustomerText>
            ),
        },

        {
            title: 'Ngày tham gia',
            render: (record: CustomerColumnType) => <CustomerText>{record.date}</CustomerText>,
        },
    ];

    !isDashboard &&
        columns.push({
            key: 'sortNumberOfOrder',
            title: 'Số giao dịch',
            sorter: true,
            render: (record: CustomerColumnType) => (
                <CustomerText>{record.numberOfOrder}</CustomerText>
            ),
        });

    !isDashboard &&
        columns.push({
            title: 'Thao tác',
            render: (record: CustomerColumnType) => (
                <CustomerActions>
                    <CustomerText
                        onClick={() =>
                            navigate(`${config.routes.admin.manageCustomer}/${record.userId}`)
                        }
                    >
                        Xem
                    </CustomerText>
                    <CustomerText onClick={() => confirm(record.userId)}>Cấm</CustomerText>
                </CustomerActions>
            ),
        });

    return columns;
};

export default CustomerColumns;
