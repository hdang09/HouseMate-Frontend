import styled from 'styled-components';
import Link from '@/components/Link';
import { theme } from '@/themes';

export const NotificationItemWrapper = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 16px;

    & .ant-avatar {
        flex-shrink: 0;
    }
`;

export const NotificationItemContent = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 6px;

    & .ant-typography {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 400;
        color: ${theme.colors.textPrimary};
        text-align: left;
        line-height: 1.4;
        white-space: normal;
    }

    & span.ant-typography:last-child {
        font-size: 1.5rem;
        color: ${theme.colors.primary};
    }

    & .ant-typography strong {
        margin: 0 4px;
        color: ${theme.colors.textPrimary};
    }
`;
