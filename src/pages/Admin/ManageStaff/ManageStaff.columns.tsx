import type { ColumnsType } from 'antd/es/table';
import { Key } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFilter } from 'react-icons/bs';

import config from '@/config';
import { TableBadge } from '@/pages/Admin/ServiceList/ServiceList.styled';
import { AccountStatus, StaffStatusLabel } from '@/utils/enums';

import getColumnSearchProps from './ManageStaff.search';
import { StaffColumnType } from './ManageStaff.type';
import { StaffActions, StaffText } from './ManageStaff.styled';

const StaffColumns = (
    confirm: (userId: number) => void,
    handleSearch: (selectedKeys: string[]) => void,
    isDashboard: boolean,
) => {
    const navigate = useNavigate();

    const columns: ColumnsType<StaffColumnType> = [
        {
            title: 'Tên nhân viên',
            ...getColumnSearchProps(handleSearch),
        },
        {
            key: 'point',
            title: 'Điểm tin cậy',
            sorter: (a, b) => a.point - b.point,
            render: (record: StaffColumnType) => <StaffText>{record.point}</StaffText>,
        },
        {
            key: 'status',
            title: 'Tình trạng',
            filters: [
                {
                    text: StaffStatusLabel.ACTIVE,
                    value: AccountStatus.ACTIVE,
                },
                {
                    text: StaffStatusLabel.INACTIVE,
                    value: AccountStatus.INACTIVE,
                },
                {
                    text: StaffStatusLabel.BANNED,
                    value: AccountStatus.BANNED,
                },
            ],
            onFilter: (value: boolean | Key, record) =>
                record.status.indexOf(value as string) === 0,
            filterIcon: () => <BsFilter size={20} />,
            render: (record: StaffColumnType) => {
                const staffStatus = record.status;
                const status = staffStatus === AccountStatus.ACTIVE ? 'processing' : 'default';

                const text = StaffStatusLabel[record.status];

                return <TableBadge status={status} text={<StaffText>{text}</StaffText>} />;
            },
        },
        {
            key: 'numberOfJobs',
            title: 'Số việc đã làm',
            sorter: (a, b) => a.numberOfJobs - b.numberOfJobs,
            render: (record: StaffColumnType) => <StaffText>{record.numberOfJobs}</StaffText>,
        },
        {
            key: 'successRate',
            title: 'Tỉ lệ thành công',
            sorter: (a, b) => a.successRate - b.successRate,
            render: (record: StaffColumnType) => <StaffText>{record.successRate}%</StaffText>,
        },
    ];

    !isDashboard
        ? columns.push({
              title: 'Thao tác',
              render: (record: StaffColumnType) => (
                  <StaffActions>
                      <StaffText
                          onClick={() =>
                              navigate(`${config.routes.admin.manageStaff}/${record.id}`)
                          }
                      >
                          Chỉnh sửa
                      </StaffText>
                      <StaffText onClick={() => confirm(record.id)}>Sa thải</StaffText>
                  </StaffActions>
              ),
          })
        : '';

    return columns;
};

export default StaffColumns;
