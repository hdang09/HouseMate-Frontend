import { theme } from '@/themes';
import styled from 'styled-components';

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
    margin-bottom: 24px;

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
