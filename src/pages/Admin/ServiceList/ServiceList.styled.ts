import { theme } from '@/themes';
import { Badge, Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

export const ServiceInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 12px;

    & .ant-image {
        flex-shrink: 0;
    }
`;

export const ServiceText = styled(Text)`
    &.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
    }
`;

export const TableBadge = styled(Badge)`
    &.ant-badge .ant-badge-status-dot {
        width: 8px;
        height: 8px;
    }
`;

export const ServiceActions = styled.div`
    display: flex;
    align-items: center;
    column-gap: 12px;

    & span.ant-typography {
        color: ${theme.colors.primary};
        cursor: pointer;
    }
`;
