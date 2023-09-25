import { Button, List, Space } from 'antd';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { theme } from '@/themes';

export const Header = styled(Space)`
    justify-content: space-between;
    width: 100%;
    padding: 56px 0;
    background-color: ${theme.colors.white};
`;

export const HeaderLogoWrapper = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
`;

export const HeaderLogoText = styled(Space.Compact)`
    & .ant-typography {
        font-size: 2.4rem;
        font-weight: 700;
        color: ${theme.colors.primary};

        &:nth-child(even) {
            color: ${theme.colors.secondary};
        }
    }
`;

export const Navbar = styled(List)`
    & .ant-list-items {
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 100px;

        & a {
            color: ${theme.colors.black};
            font-size: 1.8rem;
            font-weight: 500;
            line-height: 0.88889;
        }
    }
`;

export const NavbarLink = styled.span<{ $isActive: boolean }>`
    position: relative;
    display: inline-block;
    padding-bottom: 4px;
    transition: all 0.5s ease-in-out;

    &:hover {
        color: ${theme.colors.primary};
    }

    &::before {
        position: absolute;
        display: inline-block;
        content: '';
        right: 0;
        top: 100%;
        width: 0;
        height: 2px;
        background: ${theme.colors.primary};
        transition: all 0.25s linear 0s;
    }

    &:hover::before {
        width: 100%;
        left: 0;
        top: 100%;
    }

    ${(props) =>
        props.$isActive &&
        css`
            position: relative;
            display: inline-block;
            color: ${theme.colors.primary};

            &::before {
                width: 100%;
                left: 0;
                top: 100%;
            }
        `};
`;

export const HeaderButton = styled(Button)`
    --height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 112px;
    height: var(--height);
    line-height: var(--height);
    background-color: ${theme.colors.primary};
    border-radius: 2px;
    border: 1px solid ${theme.colors.primary};

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-color: ${theme.colors.white};
        border-radius: 2px;
        transform: scaleX(0);
        transition: all 0.25s linear;
    }

    & span {
        position: relative;
        color: ${theme.colors.white};
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.5;
        text-transform: uppercase;
        transition: all 0.25s linear;
    }

    &:hover::before {
        transform: scaleX(1);
    }

    &:hover span {
        color: ${theme.colors.primary};
    }
`;
