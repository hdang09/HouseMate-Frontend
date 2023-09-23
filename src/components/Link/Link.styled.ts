import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { theme } from '@/themes';

export const BaseLink = css`
    width: fit-content;
    text-decoration: none;
    padding-bottom: 1px;
    border-bottom: 2px solid ${theme.colors.grey};

    &:hover {
        border-color: ${theme.colors.primary};
        transition: border-color 0.25s linear 0s;
    }
`;

export const InternalLink = styled(Link)`
    ${BaseLink}
`;

export const ExternalLink = styled.a`
    ${BaseLink}
`;
