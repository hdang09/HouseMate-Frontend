import type { ColumnsType } from 'antd/es/table';

import getColumnSearchProps from './ManageCustomer.search';
import { CustomerColumnType } from './ManageCustomer.type';
import { CustomerActions, CustomerText } from './ManageCustomer.styled';

const CustomerColumns = (confirm: () => void, handleSearch: (selectedKeys: string[]) => void) => {
    const columns: ColumnsType<CustomerColumnType> = [
        {
            title: 'Tên khách hàng',
            width: 280,
            ...getColumnSearchProps(handleSearch),
        },
        {
            title: 'Số đơn hàng',
            sorter: true,
            render: (record: CustomerColumnType) => (
                <CustomerText>{record.numberOfOrder}</CustomerText>
            ),
        },
        {
            title: 'Số chi tiêu',
            sorter: true,
            render: (record: CustomerColumnType) => (
                <CustomerText>{record.amountSpent.toLocaleString() + 'đ'}</CustomerText>
            ),
        },
        {
            title: 'Giao dịch/tháng',
            width: 170,
            render: (record: CustomerColumnType) => (
                <CustomerText>{record.numberOfTransactions}</CustomerText>
            ),
        },
        {
            title: 'Thao tác',
            render: () => (
                <CustomerActions>
                    <CustomerText onClick={confirm}>Cấm</CustomerText>
                </CustomerActions>
            ),
        },
    ];

    return columns;
};

export default CustomerColumns;
