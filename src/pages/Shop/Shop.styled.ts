import styled from 'styled-components';
import { theme } from '@/themes';

export const ShopSection = styled.section`
    padding: 50px 0;
`;

export const ShopFilterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    column-gap: 8px;
    margin: 90px 0 40px;

    & span.ant-typography {
        color: ${theme.colors.textQuaternary};
        font-size: 1.8rem;
        font-weight: 400;
        line-height: 1.66667;
    }

    & .ant-select {
        min-width: 170px;
        height: 50px;
    }

    & .ant-select .ant-select-selector {
        padding: 13px 16px;
    }

    & .ant-select-selection-item {
        color: ${theme.colors.textQuaternary};
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.5;
    }

    & .ant-select-arrow {
        margin-right: 10px;
        font-size: 1.4rem;
    }

    ${({ theme }) => theme.breakpoints.down('xl')} {
        justify-content: space-between;
        padding: 0 20px;

        & > svg {
            display: block;
        }
    }

    ${({ theme }) => theme.breakpoints.down('sm')} {
        padding: 0;
    }
`;

export const ShopSidebar = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 32px;
`;
