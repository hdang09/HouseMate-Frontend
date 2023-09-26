import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { theme } from '@/themes';

export const BaseLink = css`
    position: relative;
    width: fit-content;
    text-decoration: none;

    &::before {
        position: absolute;
        display: block;
        content: '';
        right: 0;
        top: 100%;
        width: 0;
        height: 2.3px;
        opacity: 0.75;
        background: ${theme.colors.primary};
        transition: all 0.25s linear 0s;
    }

    &:hover::before {
        width: 100%;
        left: 0;
        top: 100%;
    }
`;

export const InternalLink = styled(Link)`
    ${BaseLink}
`;

export const ExternalLink = styled.a`
    ${BaseLink}
`;
