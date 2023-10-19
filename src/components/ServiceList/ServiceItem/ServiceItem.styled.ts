import { Button, Card, Image, Rate, Typography } from 'antd';

import styled, { css } from 'styled-components';

import Link from '@/components/Link';
import { theme } from '@/themes';

const { Title, Text } = Typography;

export const ServiceLink = styled(Link)`
    display: block;
`;

export const LinkButton = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const AddToCartBtn = styled(Button)`
    &.ant-btn {
        display: flex;
        justify-content: center;
        align-items: center;

        opacity: 0;
        transform: translateY(20px);
        transition: ${theme.transition.primary};
        height: 40px;
        line-height: 40px;
        font-weight: 600;
        max-width: 150px;
        margin: auto;
        font-size: 1.3rem;
        background-color: ${theme.colors.secondary};
    }
`;

export const ServiceImage = styled(Image)`
    &.ant-image-img {
        display: block;
        width: 100%;
        height: 195px;
        object-fit: cover;
    }
`;

export const ServiceCategory = styled(Text)`
    display: block;
    margin-top: 8px;
    color: ${theme.colors.textSecondary};
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.7;

    ${({ theme }) => theme.breakpoints.down('md')} {
        font-size: 1.4rem;
    }
`;

export const ServiceTitle = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.5;

        display: -webkit-box;
        -webkit-line-clamp: var(--line-clamp, 1);
        -webkit-box-orient: vertical;
        overflow: hidden;

        ${({ theme }) => theme.breakpoints.down('md')} {
            font-size: 2rem;
        }
    }
`;

const Price = styled.span`
    display: block;
    margin-bottom: 16px;
    font-weight: 500;

    &::after {
        content: 'đ';
    }
`;

export const OldPrice = styled(Price)`
    color: ${theme.colors.textTertiary};
    font-size: 1.2rem;
    line-height: 1.3;
    text-decoration: line-through;

    ${({ theme }) => theme.breakpoints.down('md')} {
        font-size: 1.6rem;
    }
`;

export const NewPrice = styled(Price)`
    color: ${theme.colors.primary};
    font-size: 1.4rem;
    line-height: 1.2;

    ${({ theme }) => theme.breakpoints.down('md')} {
        font-size: 1.8rem;
    }
`;

export const ServiceCard = styled(Card)<{ $width: number; $isSale: boolean }>`
    --ribbon-width: 56px;
    --ribbon-height: 62px;
    --ribbon-position: -1px;
    --ribbon-radius: 10px;

    width: ${(props) => `${props.$width}px`};

    position: relative;
    padding: 24px 18px 12px;
    text-align: left;
    border-color: transparent;
    border-radius: var(--ribbon-radius);
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCart};
    transition: ${theme.transition.primary};

    ${({ theme }) => theme.breakpoints.down('xl')} {
        width: 100%;
    }

    ${({ theme }) => theme.breakpoints.down('lg')} {
        margin: 0 auto;
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        max-width: 370px;
        margin: 0 auto;
    }

    ${({ theme }) => theme.breakpoints.down('sm')} {
        padding: 32px 25px 18px;
        width: 100%;
    }

    ${(props) =>
        props.$isSale &&
        css`
            &::before {
                display: flex;
                align-items: center;
                justify-content: center;

                content: 'Sale';
                position: absolute;
                top: var(--ribbon-position);
                right: var(--ribbon-position);
                z-index: 1;
                width: var(--ribbon-width);
                height: var(--ribbon-height);
                font-size: 1.4rem;
                font-weight: 600;
                line-height: 1.5;
                border-radius: var(--ribbon-radius) var(--ribbon-radius) 0 0;
                color: ${theme.colors.white};
                background-color: ${theme.colors.primary};
            }

            &::after {
                content: '';
                display: block;
                position: absolute;
                top: calc(var(--ribbon-height) - 1px);
                right: var(--ribbon-position);
                z-index: 1;

                width: 0;
                height: 0;
                border-left: calc(var(--ribbon-width) / 2) solid ${theme.colors.primary};
                border-right: calc(var(--ribbon-width) / 2) solid ${theme.colors.primary};
                border-bottom: 14px solid transparent;
            }
        `}

    &.ant-card .ant-card-cover img.ant-image-img {
        border-radius: 12px;
    }

    & .ant-card-body {
        padding: 0;
    }

    & .ant-card-body h4.ant-typography {
        margin: 0 0 10px;
        transition: ${theme.transition.primary};

        ${({ theme }) => theme.breakpoints.down('md')} {
            margin-bottom: 14px;
        }
    }

    & .ant-card-cover {
        position: relative;
    }

    &:hover {
        border-color: ${theme.colors.divider};
        box-shadow: 0px 24px 55px 0px ${theme.colors.shadowCartHover};
    }

    &:hover ${ServiceTitle} {
        color: ${theme.colors.secondary};
    }

    &:hover ${AddToCartBtn} {
        opacity: 1;
        transform: translateY(0);
    }
`;
export const Rating = styled(Rate)`
    &.ant-rate .ant-rate-star {
        font-size: 1.8rem;
        margin-inline-end: 4px;
    }
`;

export const TotalSold = styled(Text)`
    color: ${theme.colors.textSecondary};
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 2.5;

    ${({ theme }) => theme.breakpoints.down('md')} {
        font-size: 1.4rem;
    }
`;
