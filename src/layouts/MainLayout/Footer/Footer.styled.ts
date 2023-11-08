import { Button, Row } from 'antd';
import styled from 'styled-components';
import { theme } from '@/themes';
import Link from '@/components/Link';

export const FooterSection = styled.footer`
    padding: 60px 0;
    background-color: ${theme.colors.divider};
`;

export const FooterCTA = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 20px;

    & .ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textPrimary};
        font-size: 2rem;
        font-weight: 500;
        letter-spacing: -0.3px;
    }
`;

export const FooterButton = styled(Button)`
    --height: 48px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 20px;
    min-width: 130px;
    height: var(--height);
    line-height: var(--height);
    background-color: ${theme.colors.primary};
    border: 1px solid ${theme.colors.primary};

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-color: ${theme.colors.white};
        border-radius: 6px;
        transform: scaleX(0);
        transition: ${theme.transition.primary};
    }

    & span {
        position: relative;
        color: ${theme.colors.white};
        font-size: 1.8rem;
        font-weight: 400;
        line-height: 1.5;
        transition: ${theme.transition.primary};
    }

    &:hover::before {
        transform: scaleX(1);
    }

    &:hover span {
        color: ${theme.colors.primary};
    }

    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
    }
`;

export const FooterColumnWrapper = styled.div`
    & h3.ant-typography {
        margin-bottom: 20px;
        color: ${theme.colors.textPrimary};
        font-size: 1.8rem;
        font-weight: 500;
        letter-spacing: -0.232px;
    }

    & li.ant-list-item {
        padding: 0 0 20px 0;
        border: none;

        & a {
            color: ${theme.colors.textSecondary};
            font-size: 1.6rem;
            font-weight: 400;
            text-align: left;
            letter-spacing: -0.205px;

            &:hover {
                color: ${theme.colors.black};
            }
        }
    }
`;

export const FooterRow = styled(Row)`
    ${({ theme }) => theme.breakpoints.down('md')} {
        flex-direction: column-reverse;
    }
`;

export const FooterCopyright = styled.div`
    margin-top: 80px;

    & span.ant-typography {
        color: ${theme.colors.textSecondary};
        font-size: 1.6rem;
        font-weight: 400;
        letter-spacing: -0.205px;
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        margin-top: 20px;
        text-align: center;
    }
`;

export const FooterSocials = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    column-gap: 32px;
    margin-top: 80px;

    & a {
        display: flex;
        padding: 8px;
        color: ${theme.colors.textPrimary};
        border: 1px solid ${theme.colors.textPrimary};
        border-radius: 999px;
        transition: ${theme.transition.primary};

        & svg {
            transition: ${theme.transition.primary};
        }

        &:hover {
            border-color: ${theme.colors.primary};
        }

        &:hover svg {
            color: ${theme.colors.primary};
        }
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        justify-content: center;
        margin-top: 60px;
    }
`;

export const FooterSocialsLink = styled(Link)`
    display: -webkit-box;
    -webkit-line-clamp: var(--line-clamp, 1);
    -webkit-box-orient: vertical;
    overflow: hidden;
`;
