import { Button, Image, Typography } from 'antd';

import ServiceList from '@/components/ServiceList';
import styled from 'styled-components';
import { theme } from '@/themes';

const { Title, Paragraph } = Typography;

export const BestServiceSection = styled.section`
    padding-top: 42px;
    background-color: ${theme.colors.white};
`;

export const BestServiceTitle = styled(Title)`
    &.ant-typography {
        margin-bottom: 16px;
        font-size: 4rem;
        font-weight: 700;
        line-height: 1.25;
    }
`;

export const BestServiceDesc = styled(Paragraph)`
    &.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textSecondary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.625;
    }
`;

export const BestServiceButton = styled(Button)`
    --height: 56px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 auto;
    padding: 15px 26px;
    min-width: 236px;
    height: var(--height);
    line-height: var(--height);
    border: none;
    border-radius: 12px;
    background: ${theme.colors.primary};

    & .ant-typography {
        color: ${theme.colors.white};
        font-size: 2rem;
        font-weight: 600;
    }

    & span {
        flex: 1;
    }

    & svg {
        margin-left: 10px;
        transition: ${theme.transition.primary};
    }

    &:hover svg {
        transform: translateX(4px);
    }

    ${({ theme }) => theme.breakpoints.down('lg')} {
        margin-top: 32px;
    }
`;

export const BestServiceList = styled(ServiceList)`
    margin-top: 48px;
`;

export const FeedbackSection = styled.section`
    padding: 60px 0;
    background-color: ${theme.colors.white};
`;

export const FeedbackImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FeedbackImage = styled(Image)`
    max-height: 600px;
    object-fit: contain;
`;

export const FeedbackTitle = styled(Title)`
    &.ant-typography {
        margin-bottom: 24px;
        color: ${theme.colors.textPrimary};
        font-size: 4rem;
        font-weight: 600;
        line-height: 1.25;
    }
`;

export const FeedbackContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FeedbackDesc = styled(Paragraph)`
    &.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textSecondary};
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 1.55556;
    }
`;

export const FeedbackUser = styled.div`
    display: flex;
    align-items: center;
    column-gap: 18px;
    margin-top: 40px;

    & .ant-image-mask {
        border-radius: 999px;
    }

    & .ant-image {
        flex-shrink: 0;
    }
`;

export const FeedbackUserImage = styled(Image)`
    border-radius: 999px;
    object-fit: cover;
`;

export const FeedbackUserInfo = styled.div`
    display: flex;
    flex-direction: column;

    & div.ant-typography {
        margin-bottom: 2px;
        color: ${theme.colors.black};
        font-size: 1.6rem;
        font-weight: 600;
        letter-spacing: -0.14px;
        line-height: 1.5;
    }

    & span.ant-typography {
        margin-bottom: 12px;
        color: ${theme.colors.textSecondary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1;
        letter-spacing: -0.12px;
        line-height: 1.5;
    }
`;
