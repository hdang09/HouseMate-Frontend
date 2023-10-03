import styled from 'styled-components';
import { theme } from '@/themes';
import { Input } from 'antd';

const { Search } = Input;

export const ShopSection = styled.section`
    padding: 50px 0;
`;

export const ShopSearchInput = styled(Search)`
    width: 100%;

    & .ant-input-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 690px;
        height: 50px;
        margin: 0 auto;
    }

    & .ant-input {
        height: 100%;
        padding: 8px 12px;
        border-radius: 2px;
        border: 1px solid ${theme.colors.borderInput};
        background: ${theme.colors.white};

        color: ${theme.colors.textPrimary};
        font-size: 1.8rem;
        font-weight: 400;
        line-height: 1.33333;

        &::placeholder {
            color: ${theme.colors.disabledPlaceholder};
        }
    }

    & .ant-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        min-width: 46px;
        height: 50px;
        padding: 18px 16px;
        background-color: ${theme.colors.primary};
        border: none;

        & svg {
            font-size: 1.8rem;
            color: ${theme.colors.white};
        }
    }
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
        min-width: 194px;
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
`;

export const ShopSidebar = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 32px;
`;
