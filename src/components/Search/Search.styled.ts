import { Input } from 'antd';
import styled from 'styled-components';
import { theme } from '@/themes';

const { Search } = Input;

export const SearchInput = styled(Search)`
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
