import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { theme } from '@/themes';

type LinkStyledType = {
    title: string;
    $zoom?: boolean;
    $underline?: boolean;
    $scroll?: boolean;
};

export const LinkStyled = styled(Link)<LinkStyledType>`
    position: relative;
    text-align: center;

    ${(props) =>
        props.$zoom &&
        css`
            &::before {
                content: attr(title);
                display: block;
                font-weight: 600;
                height: 0;
                overflow: hidden;
                visibility: hidden;
            }

            &:hover {
                font-weight: 600;
            }
        `};

    ${(props) =>
        props.$underline &&
        css`
            &::after {
                content: '';
                display: block;
                position: absolute;
                top: 100%;
                right: 0;
                width: 0;
                height: 1.6px;
                background: ${theme.colors.primary};
                transition: ${theme.transition.primary};
            }

            &::after {
                width: 100%;
            }
        `};

    ${(props) =>
        props.$scroll &&
        css`
            &::after {
                width: 0;
            }

            &:hover::after {
                width: 100%;
                top: 100%;
                left: 0px;
            }
        `};
`;
