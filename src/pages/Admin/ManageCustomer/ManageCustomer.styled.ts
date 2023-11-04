import { Table, Typography } from 'antd';
import styled from 'styled-components';
import { theme } from '@/themes';

const { Text } = Typography;

export const ManageCustomerTable = styled(Table)`
    flex: 1;
    border-radius: 8px;
    background-color: ${theme.colors.white};
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCart};
`;

export const CustomerText = styled(Text)`
    &.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
    }
`;

export const CustomerActions = styled.div`
    display: flex;
    align-items: center;
    column-gap: 12px;
    & span.ant-typography {
        color: ${theme.colors.primary};
        cursor: pointer;
    }
`;
