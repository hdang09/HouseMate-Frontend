import { Button, List } from 'antd';
import styled from 'styled-components';
import Link from '@/components/Link';
import { theme } from '@/themes';

export const Header = styled.header`
    position: relative;
    z-index: 99;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 44px 0;
    background-color: transparent;
`;

export const Navbar = styled(List)`
    & .ant-list-items {
        display: flex;
        align-items: center;
        justify-content: center;

        column-gap: 100px;
    }
`;

export const NavbarLink = styled(Link)`
    position: relative;
    display: inline-block;
    color: ${theme.colors.textPrimary};
    font-family: 'Poppins';
    font-size: 1.8rem;
    font-weight: 400;

    &::before {
        position: absolute;
        display: inline-block;
        content: '';
        left: 0;
        bottom: 1px;
        width: 0;
        height: 2px;
        background: ${theme.colors.primary};
    }

    &.active::before {
        width: 100%;
        left: 0;
        bottom: 1px;
    }
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
        transition: ${theme.transition.primary};
    }

    & span {
        position: relative;
        color: ${theme.colors.white};
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.5;
        text-transform: uppercase;
        transition: ${theme.transition.primary};
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

export const HeaderAvatarWrapper = styled.div`
    width: 100%;

    & span.ant-typography {
        padding: 0 24px;
        width: 100%;
        color: ${theme.colors.textPrimary};
        font-size: 1.7rem;
        font-weight: 500;
        line-height: 1;
    }

    & div.ant-divider {
        margin: 8px 0 0;
    }
`;
