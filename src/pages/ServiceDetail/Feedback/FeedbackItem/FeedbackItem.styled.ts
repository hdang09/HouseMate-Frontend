import styled from 'styled-components';
import { theme } from '@/themes';

export const FeedbackItemWrapper = styled.article`
    display: flex;
    column-gap: 32px;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        column-gap: 16px;
    }

    & .ant-avatar {
        width: 64px;
        height: 64px;
        flex-shrink: 0;

        ${({ theme }) => theme.breakpoints.down('sm')} {
            width: 48px;
            height: 48px;
        }
    }
`;

export const FeedbackItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    max-width: 578px;

    & .ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.57143;
    }

    & .ant-rate li.ant-rate-star {
        margin-inline-end: 3px;

        & svg {
            font-size: 1.6rem;
        }
    }

    & span.ant-typography {
        color: ${theme.colors.textSecondary};
        font-size: 1.4rem;
    }
`;
