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
`;

export const FeedbackContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 8px;

    & h3.ant-typography {
        color: ${theme.colors.primary};
        font-size: 4.8rem;
        font-weight: 500;
        line-height: 1.04167;
    }
`;

export const FeedbackProgressBar = styled.div`
    width: 410px;
`;
