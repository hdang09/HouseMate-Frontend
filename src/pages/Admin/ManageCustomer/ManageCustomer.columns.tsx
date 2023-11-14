import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import config from '@/config';
import { AccountStatus, AccountStatusLabel } from '@/utils/enums';

import { CustomerColumnType } from './ManageCustomer.type';
import getColumnSearchProps from './ManageCustomer.search';
import { TableBadge } from '@/pages/Admin/ServiceList/ServiceList.styled';
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
            title: 'Tình trạng',
            render: (record: CustomerColumnType) => {
                switch (record.accountStatus) {
                    case AccountStatus.ACTIVE:
                        return (
                            <TableBadge
                                status="processing"
                                text={<CustomerText>{AccountStatusLabel.ACTIVE}</CustomerText>}
                            />
                        );

                    case AccountStatus.INACTIVE:
                        return (
                            <TableBadge
                                status="default"
                                text={<CustomerText>{AccountStatusLabel.INACTIVE}</CustomerText>}
                            />
                        );

                    case AccountStatus.BANNED:
                        return (
                            <TableBadge
                                status="error"
                                text={<CustomerText>{AccountStatusLabel.BANNED}</CustomerText>}
                            />
                        );
                }
            },
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
            render: (record: CustomerColumnType) => (
                <CustomerText>{dayjs(record.date).format('DD/MM/YYYY')}</CustomerText>
            ),
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
