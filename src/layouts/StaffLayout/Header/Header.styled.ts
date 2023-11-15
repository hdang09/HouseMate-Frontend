import styled from 'styled-components';
import { theme } from '@/themes';

export const HeaderSection = styled.header`
    background-color: transparent;
`;
export const HeaderInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 8px;
    padding: 24px 0;
    background-color: ${theme.colors.white};
    box-shadow: 0px -1px 0px 0px ${theme.colors.descTabBorder} inset;

    & .ant-typography {
        margin-bottom: 0;
        margin-right: auto;
        color: ${theme.colors.textPrimary};
        font-size: 1.8rem;
        font-weight: 500;
    }

    & .ant-badge-count {
        color: ${theme.colors.white};
        text-align: center;
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 1.66667;
    }
`;
