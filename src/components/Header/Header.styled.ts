import { Button, List } from 'antd';
import styled, { css } from 'styled-components';
import { theme } from '@/themes';
import Link from '@/components/Link';

export const Header = styled.header`
    position: relative;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 44px 0;
    background-color: transparent;
`;

export const HeaderLogoWrapper = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 10px;
`;

export const HeaderTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & .ant-typography {
        font-size: 2.4rem;
        font-weight: 700;
    }

    & .ant-typography:last-child,
    & .ant-typography:first-child {
        color: ${theme.colors.primary};
    }

    & .ant-typography:nth-child(2) {
        color: ${theme.colors.secondary};
    }
`;

export const Navbar = styled(List)`
    & .ant-list-items {
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 100px;
    }
`;

export const NavbarLink = styled.span<{ $isActive: boolean }>`
    display: inline-block;
    color: ${theme.colors.textPrimary};
    font-family: 'Poppins';
    font-size: 1.8rem;
    font-weight: 500;
    line-height: 1.4;
    transition: ${theme.transition.primary};

    /* &:hover {
        color: ${theme.colors.primary};
    } */

    &::before {
        position: absolute;
        display: inline-block;
        content: '';
        right: 0;
        bottom: 1px;
        width: 0;
        height: 2px;
        background: ${theme.colors.primary};
        transition: ${theme.transition.primary};
    }

    ${(props) =>
        props.$isActive &&
        css`
            position: relative;
            display: inline-block;
            /* color: ${theme.colors.primary}; */

            &::before {
                width: 100%;
                left: 0;
                bottom: 1px;
                background: ${theme.colors.primary};
            }
        `};
`;

export const HeaderButton = styled(Button)`
    --height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    min-width: 112px;
    height: var(--height);
    line-height: var(--height);
    background-color: ${theme.colors.secondary};
    border-radius: 2px;
    border: 1px solid ${theme.colors.secondary};

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
        font-weight: 400;
        line-height: 1.5;
        text-transform: uppercase;
        transition: all 0.25s linear;
    }

    &.ant-btn.ant-btn-default:hover {
        border-color: ${theme.colors.secondary};
    }

    &:hover::before {
        transform: scaleX(1);
    }

    &:hover span {
        color: ${theme.colors.secondary};
    }
`;
