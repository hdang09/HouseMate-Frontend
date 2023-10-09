import styled from 'styled-components';
import { theme } from '@/themes';

export const FeedbackFilterButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 21px;
    margin-top: 44px;

    & button.ant-btn {
        min-width: 68px;
        height: 32px;
        padding: 0 15px;
        border-radius: 2px;
        border: 1px solid ${theme.colors.primary};
        color: ${theme.colors.textPrimary};
        background: ${theme.colors.white};
        box-shadow: 0px 2px 0px 0px ${theme.colors.shadowDropdown};

        text-align: center;
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;

        &.ant-btn-primary {
            color: ${theme.colors.white};
            background: ${theme.colors.primary};
        }
    }
`;

export const FeedbackListWrapper = styled.div`
    margin-top: 44px;

    & li.ant-list-item {
        border: none;
        padding: 32px 0;
    }
`;
