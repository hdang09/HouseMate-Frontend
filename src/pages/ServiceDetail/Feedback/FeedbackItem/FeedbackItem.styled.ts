import styled from 'styled-components';
import { theme } from '@/themes';

export const FeedbackItemWrapper = styled.article`
    display: flex;
    justify-content: center;
    column-gap: 32px;
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
