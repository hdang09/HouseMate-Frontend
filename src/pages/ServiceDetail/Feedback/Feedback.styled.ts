import styled from 'styled-components';
import { ServiceDetailTabItem } from '@/pages/ServiceDetail/ServiceDetail.styled';
import { theme } from '@/themes';

export const FeedbackWrapper = styled.section`
    ${ServiceDetailTabItem}
`;

export const FeedbackReview = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 56px;
    margin-top: 32px;

    ${({ theme }) => theme.breakpoints.down('md')} {
        flex-direction: column;
        row-gap: 16px;
    }
`;

export const FeedbackContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 8px;

    & h3.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.primary};
        font-size: 4.8rem;
        font-weight: 500;
        line-height: 1.04167;
    }

    & span.ant-typography {
        color: ${theme.colors.textSecondary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
    }
`;

export const FeedbackProgressBar = styled.div`
    ${({ theme }) => theme.breakpoints.down('sm')} {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
    }

    & .ant-progress-outer {
        display: inline;
    }

    & .ant-progress-inner {
        width: 341px;

        ${({ theme }) => theme.breakpoints.down('sm')} {
            width: 250px;
        }
    }
`;

export const FeedbackProgressItem = styled.div`
    display: flex;
    align-items: center;
    column-gap: 8px;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        flex-direction: column;
        align-items: flex-start;
    }

    .ant-progress {
        margin-bottom: 4px;
    }

    & .ant-space-item:first-child {
        min-width: 12px;
    }

    & span.ant-typography,
    & span.ant-progress-text {
        text-align: center;
        color: ${theme.colors.black};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.875;
    }
`;
