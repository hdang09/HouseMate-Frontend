import { Button } from 'antd';
import styled from 'styled-components';
import { theme } from '@/themes';

export const FooterSection = styled.footer`
    padding: 60px 0 120px;
    background-color: ${theme.colors.white};
`;

export const FooterCTA = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 20px;

    & .ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 2rem;
        font-weight: 500;
        letter-spacing: -0.3px;
    }
`;

export const FooterButton = styled(Button)`
    --height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
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

export const FooterColumnWrapper = styled.div`
    & h3.ant-typography {
        margin-bottom: 20px;
        color: ${theme.colors.textPrimary};
        font-size: 1.8rem;
        font-weight: 400;
        letter-spacing: -0.232px;
    }
`;
