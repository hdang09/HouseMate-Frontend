import styled from 'styled-components';
import { theme } from '@/themes';

export const BaseLink = styled.a`
    width: fit-content;
    text-decoration: none;
    /* padding-bottom: 1px; */
    border-bottom: 2px solid ${theme.colors.grey};

    &:hover {
        border-color: ${theme.colors.primary};
        transition: border-color 0.25s linear 0s;
    }
`;
