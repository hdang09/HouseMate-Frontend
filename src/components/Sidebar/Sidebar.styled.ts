import styled from 'styled-components';
import { theme } from '@/themes';

export const SidebarContent = styled.div`
    padding: 24px 28px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.borderDefault};
    background: ${theme.colors.white};

    & h2.ant-typography {
        margin-bottom: 32px;
        color: ${theme.colors.primary};
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.5;
    }
`;
