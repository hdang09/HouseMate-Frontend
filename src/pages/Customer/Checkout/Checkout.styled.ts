import { Form, Typography } from 'antd';
import styled, { css } from 'styled-components';
import { theme } from '@/themes';

const { Text } = Typography;

export const CheckoutSection = styled.section`
    padding: 50px 0;

    & .ant-table-wrapper .ant-table-thead > tr > th {
        border-bottom: 1px solid ${theme.colors.primary};
    }
`;

export const CheckoutTitle = styled.h2`
    display: flex;
    align-items: flex-end;
    column-gap: 8px;
    margin-bottom: 50px;

    & span.ant-typography:first-child {
        color: ${theme.colors.textPrimary};
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.33333;
    }

    & span.ant-typography:last-child {
        color: ${theme.colors.textSecondary};
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.4;
    }
`;

export const CheckoutServiceName = styled.div`
    display: flex;
    align-items: center;
    column-gap: 16px;

    & .ant-image-img {
        width: 55px;
        border-radius: 12px;
    }

    & span.ant-typography {
        min-width: 120px;
        color: ${theme.colors.textPrimary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
    }
`;

export const CheckoutText = css`
    color: ${theme.colors.textPrimary};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.57143;
`;

export const CheckoutVariantName = styled(Text)`
    ${CheckoutText}
`;

export const CheckoutServiceQuantity = styled(Text)`
    ${CheckoutText}
`;

export const CheckoutServicePrice = styled(Text)`
    ${CheckoutText}
`;

export const CheckoutCusInfo = styled.div`
    padding: 16px 20px 36px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.descTabBorder};

    & h3.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5;
    }
`;

export const CheckoutForm = styled(Form)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: 32px;
    column-gap: 16px;
    margin-top: 30px;

    & .ant-form-item-explain-error {
        display: none;
    }
`;

export const CheckoutPayment = styled.div`
    margin-top: 36px;
    padding: 16px 20px 36px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.descTabBorder};

    & h3.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.5;
    }
`;

export const CheckoutPaymentImgWrapper = styled.figure`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 22px;
    padding: 18px 16px 12px 18px;
    width: 180px;
    height: 150px;
    border-radius: 15px;
    background: ${theme.colors.white};
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCartHover};

    & img {
        width: 100%;
        aspect-ratio: 16/9;
    }
`;

export const CheckoutTotalWrapper = styled.div`
    margin-top: 36px;
    padding: 36px 34px 25px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.descTabBorder};
    background-color: ${theme.colors.white};

    & h3.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textSecondary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.5;
    }

    & span.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.4;
    }

    & .ant-space:first-of-type {
        margin-bottom: 32px;
    }

    & .ant-space:nth-of-type(2) {
    }

    & .ant-space:last-of-type {
        & h3.ant-typography {
            color: ${theme.colors.textPrimary};
            font-size: 1.6rem;
            font-weight: 400;
            line-height: 1.5;
        }
    }

    & .ant-space {
        justify-content: space-between;
        width: 100%;
    }

    & .ant-divider {
        margin: 32px 0;
    }

    & .ant-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 32px;
        padding: 0 100px;
        height: 50px;
        line-height: 50px;
        border-radius: 2px;

        color: ${theme.colors.white};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.57143;

        box-shadow: 0px 2px 0px 0px ${theme.colors.shadowButton};
    }
`;
