import { Table, Typography } from 'antd';

import Link from '@/components/Link';
import styled from 'styled-components';
import { theme } from '@/themes';

const { Text } = Typography;

export const ManageStaffTable = styled(Table)`
    flex: 1;
    border-radius: 8px;
    background-color: ${theme.colors.white};
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCart};

    & .ant-dropdown-trigger.ant-table-filter-trigger {
        border: 1px solid ${theme.colors.disabledPlaceholder};
        margin-left: 12px;
    }
`;

export const StaffText = styled(Text)`
    &.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
    }
`;

export const StaffLink = styled(Link)`
    color: ${theme.colors.primary};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.57143;
`;

export const StaffActions = styled.div`
    display: flex;
    align-items: center;
    column-gap: 12px;

    & span.ant-typography {
        color: ${theme.colors.primary};
        cursor: pointer;
    }
`;
