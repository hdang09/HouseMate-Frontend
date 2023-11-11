import { StaffActions, StaffLink, StaffText } from './ManageStaff.styled';
import { StaffStatus, StaffStatusLabel } from '@/utils/enums';

import { BsFilter } from 'react-icons/bs';
import type { ColumnsType } from 'antd/es/table';
import { StaffColumnType } from './ManageStaff.type';
import { TableBadge } from '@/pages/Admin/ServiceList/ServiceList.styled';
import { AccountStatus, StaffStatusLabel } from '@/utils/enums';
import getColumnSearchProps from './ManageStaff.search';

const StaffColumns = (
    confirm: () => void,
    handleSearch: (selectedKeys: string[]) => void,
    isDashboard: boolean,
) => {
    const columns: ColumnsType<StaffColumnType> = [
        {
            title: 'Tên nhân viên',
            ...getColumnSearchProps(handleSearch),
        },
        {
            title: 'Điểm tin cậy',
            sorter: true,
            render: (record: StaffColumnType) => <StaffText>{record.point}</StaffText>,
        },
        {
            title: 'Tình trạng',
            filters: [],
            filterIcon: () => <BsFilter size={20} />,
            render: (record: StaffColumnType) => {
                const staffStatus = record.status;
                const status = staffStatus === AccountStatus.ACTIVE ? 'processing' : 'default';

                const text = StaffStatusLabel[record.status];

                return <TableBadge status={status} text={<StaffText>{text}</StaffText>} />;
            },
        },
        {
            title: 'Số việc đã làm',
            sorter: true,
            render: (record: StaffColumnType) => <StaffText>{record.numberOfJobs}</StaffText>,
        },
        {
            title: 'Tỉ lệ thành công',
            sorter: true,
            render: (record: StaffColumnType) => <StaffText>{record.successRate}%</StaffText>,
        },
    ];

    !isDashboard
        ? columns.push({
              title: 'Thao tác',
              render: () => (
                  <StaffActions>
                      <StaffText>Chỉnh sửa</StaffText>
                      <StaffText onClick={confirm}>Xóa</StaffText>
                  </StaffActions>
              ),
          })
        : '';

    return columns;
};

export default StaffColumns;
