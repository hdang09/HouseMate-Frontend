import styled, { css } from 'styled-components';
import { theme } from '@/themes';

export const ConfirmSection = styled.section`
    margin: 72px 0 134px;
`;

export const ConfirmInner = styled.div`
    max-width: 768px;
    margin: 0 auto;
    padding: 30px 19px 14px;
    background-color: ${theme.colors.white};
    border-radius: 15px;
    border: 1px solid ${theme.colors.descTabBorder};
    box-shadow: 0px 24px 55px 0px ${theme.colors.shadowPurchasedHover};

    & .ant-divider {
        margin: 16px 0;
    }

    & button.ant-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 50px;
        margin-top: 16px;
        border-radius: 2px;
        border: 1px solid ${theme.colors.primary};
        background: ${theme.colors.primary};
        box-shadow: 0px 2px 0px 0px ${theme.colors.shadowButton};

        color: ${theme.colors.white};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
    }
`;

export const ConfirmPrimaryText = css`
    margin-bottom: 0;
    color: ${theme.colors.textPrimary};
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.5;
`;

export const ConfirmSecondaryText = css`
    color: ${theme.colors.textSecondary};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.57143;
`;

export const ConfirmSuccessMsg = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 16px;

    & h2.ant-typography {
        ${ConfirmPrimaryText}
        font-size: 3rem;
        line-height: 1.33333;

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 2.2rem;
        }
    }

    & span.ant-typography {
        ${ConfirmSecondaryText}

        & span:first-child {
            color: ${theme.colors.primary};
        }

        & span:last-child {
            color: ${theme.colors.secondary};
        }

        & a {
            display: inline-flex;
            align-items: center;
            justify-content: center;

            column-gap: 4px;
            margin: 0 4px;

            &::after {
                height: 1px;
            }
        }
    }
`;

export const ConfirmTransaction = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 12px;

    & h3.ant-typography {
        ${ConfirmPrimaryText}
    }

    & span.ant-typography {
        ${ConfirmSecondaryText}
    }
`;

export const ConfirmPaymentMethod = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 12px;

    & h3.ant-typography {
        ${ConfirmPrimaryText}
    }

    & figure {
        width: 84px;
        height: 46px;
    }

    & img {
        width: 100%;
        aspect-ratio: 16/9;
    }
`;

export const ConfirmCartList = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 12px;

    & h3.ant-typography {
        ${ConfirmPrimaryText}
    }

    & .ant-table-wrapper .ant-table-tbody > tr:last-child > td {
        border-bottom: none;
    }
`;

export const PaymentSubPrice = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 22px;

    & h3.ant-typography {
        ${ConfirmPrimaryText}
        color: ${theme.colors.textSecondary};
    }

    & span.ant-typography {
        ${ConfirmSecondaryText}
        color: ${theme.colors.textPrimary};
    }
`;

export const PaymentMainPrice = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 22px;

    & h3.ant-typography {
        ${ConfirmPrimaryText}
    }

    & span.ant-typography {
        ${ConfirmPrimaryText}
        font-size: 2rem;
        line-height: 1.4;
    }
`;
