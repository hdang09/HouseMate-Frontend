import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { theme } from '@/themes';

type LinkProps = {
    isText: boolean;
};

export const BaseLink = css<LinkProps>`
    position: relative;
    text-decoration: none;
    
    &::before {
        position: absolute;
        content: '';
        right: 0;
        bottom: 0;
        width: 0;
        height: 2px;
        opacity: 0.75;
        background: ${theme.colors.primary};
        transition: all 0.25s linear 0s;
    }

    &:hover::before {
        width: ${(props) => (props.isText ? '100%' : '0')};
        left: 0;
        bottom: 0;
    }
`;

export const InternalLink = styled(Link)<LinkProps>`
    ${BaseLink}
`;

export const ExternalLink = styled.a<LinkProps>`
    ${BaseLink}
`;
