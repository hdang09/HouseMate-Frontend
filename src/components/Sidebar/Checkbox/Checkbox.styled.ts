import styled from 'styled-components';
import { theme } from '@/themes';

export const CategoryContent = styled.div`
    & .ant-checkbox-group {
        flex-direction: column;
        row-gap: 16px;
    }

    & .ant-checkbox-wrapper span:last-child {
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.875;
    }
`;
