import styled from 'styled-components';
import { theme } from '@/themes';

export const HeaderSection = styled.header`
    background-color: transparent;
    padding: 24px 0;
    box-shadow: 0px -1px 0px 0px ${theme.colors.descTabBorder} inset;
`;
export const HeaderInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 8px;

    & .ant-typography {
        margin-bottom: 0;
        margin-right: auto;
        color: ${theme.colors.textPrimary};
        font-size: 1.3rem;
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
