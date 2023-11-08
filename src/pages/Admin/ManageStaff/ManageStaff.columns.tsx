import { StaffActions, StaffLink, StaffText } from './ManageStaff.styled';
import { StaffStatus, StaffStatusLabel } from '@/utils/enums';

import { BsFilter } from 'react-icons/bs';
import type { ColumnsType } from 'antd/es/table';
import { StaffColumnType } from './ManageStaff.type';
import { TableBadge } from '@/pages/Admin/ServiceList/ServiceList.styled';
import config from '@/config';
import getColumnSearchProps from './ManageStaff.search';

const StaffColumns = (confirm: () => void, handleSearch: (selectedKeys: string[]) => void) => {
    const columns: ColumnsType<StaffColumnType> = [
        {
            title: 'Tên nhân viên',
            width: 280,
            ...getColumnSearchProps(handleSearch),
        },
        {
            title: 'Điểm tin cậy',
            sorter: true,
            width: 170,
            render: (record: StaffColumnType) => <StaffText>{record.point}</StaffText>,
        },
        {
            title: 'Tình trạng',
            filters: [],
            width: 170,
            filterIcon: () => <BsFilter size={20} />,
            render: (record: StaffColumnType) => {
                const staffStatus = record.status;
                const status = staffStatus === StaffStatus.WORKING ? 'processing' : 'default';

                const text =
                    staffStatus === StaffStatus.WORKING
                        ? StaffStatusLabel.WORKING
                        : StaffStatusLabel.QUIT;

                return <TableBadge status={status} text={<StaffText>{text}</StaffText>} />;
            },
        },
        {
            title: 'Số việc đã làm',
            sorter: true,
            width: 170,
            render: (record: StaffColumnType) => <StaffText>{record.numberOfJobs}</StaffText>,
        },
        {
            title: 'Thao tác',
            width: 170,
            render: (record: StaffColumnType) => (
                <StaffActions>
                    <StaffLink to={`${config.routes.admin.manageStaff}/${record.id}`}>
                        Chỉnh sửa
                    </StaffLink>
                    <StaffText onClick={confirm}>Xóa</StaffText>
                </StaffActions>
            ),
        },
    ];

    return columns;
};

export default StaffColumns;
