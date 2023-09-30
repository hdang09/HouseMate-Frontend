import styled, { css } from 'styled-components';
import Link from '@/components/Link';
import { theme } from '@/themes';

type NotifyProps = {
    $isRead: boolean;
};

export const NotificationItemWrapper = styled(Link)<NotifyProps>`
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 12px;
    padding: 12px 16px;

    & .ant-avatar {
        flex-shrink: 0;
    }

    ${(props) =>
        !props.$isRead &&
        css`
            /* background-color: ${theme.colors.hoverPrimary}; */

            & div.ant-typography,
            & div.ant-typography strong {
                color: ${theme.colors.textPrimary};
            }

            & div ~ span.ant-typography {
                color: ${theme.colors.primary};
            }

            &::after {
                content: '';
                display: block;
                position: absolute;
                right: 4px;
                background-color: ${theme.colors.primary};
                border-radius: 50%;
                height: 10px;
                width: 10px;
            }
        `}
`;

export const NotificationItemContent = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    & .ant-typography {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 400;
        color: ${theme.colors.textSecondary};
        text-align: left;
        white-space: normal;
    }

    & .ant-typography strong {
        color: ${theme.colors.textSecondary};
    }

    & span.ant-typography {
        color: ${theme.colors.textSecondary};
        font-size: 1.4rem;
    }
`;
