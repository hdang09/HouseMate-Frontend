import type { ColumnsType } from 'antd/es/table';

import getColumnSearchProps from './ManageCustomer.search';
import { CustomerColumnType } from './ManageCustomer.type';
import { CustomerActions, CustomerText } from './ManageCustomer.styled';

const CustomerColumns = (
    confirm: () => void,
    handleSearch: (selectedKeys: string[]) => void,
    isDashboard: boolean,
) => {
    const columns: ColumnsType<CustomerColumnType> = [
        {
            title: 'Tên khách hàng',
            ...getColumnSearchProps(handleSearch),
        },
        {
            title: 'Số lịch đã đặt',
            sorter: true,
            render: (record: CustomerColumnType) => (
                <CustomerText>{record.numberOfSchedule}</CustomerText>
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
            title: 'Ngày tham gia',
            render: (record: CustomerColumnType) => <CustomerText>{record.date}</CustomerText>,
        },
    ];

    !isDashboard
        ? columns.push({
              title: 'Số giao dịch',
              render: (record: CustomerColumnType) => (
                  <CustomerText>{record.numberOfOrder}</CustomerText>
              ),
          })
        : '';

    !isDashboard
        ? columns.push({
              title: 'Thao tác',
              render: () => (
                  <CustomerActions>
                      <CustomerText onClick={confirm}>Cấm</CustomerText>
                  </CustomerActions>
              ),
          })
        : '';

    return columns;
};

export default CustomerColumns;
