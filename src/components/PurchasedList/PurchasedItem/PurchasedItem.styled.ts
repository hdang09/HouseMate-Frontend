import { Image } from 'antd';
import styled from 'styled-components';
import Link from '@/components/Link';
import { theme } from '@/themes';

export const PurchasedItemLink = styled(Link)`
    width: 100%;
    text-align: left;
`;

export const PurchasedItemWrapper = styled.section`
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 24px;
    width: 100%;

    border-radius: 4px;
    background: ${theme.colors.white};
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowPurchased};
    transition: ${theme.transition.primary};
    overflow: hidden;

    &:hover {
        box-shadow: 0px 17px 55px 0px ${theme.colors.shadowPurchasedHover};
    }

    &:hover button {
        opacity: 1;
        visibility: visible;
        transform: translateX(0);
        cursor: pointer;
    }

    ${({ theme }) => theme.breakpoints.down('sm')} {
        flex-direction: column;
        row-gap: 10px;
        align-items: flex-start;
    }
`;

export const PurchasedItemImageWrapper = styled.figure`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 300px;
    height: 200px;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
`;

export const PurchasedItemImage = styled(Image)`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const PurchasedItemContent = styled.div`
    padding-right: 10px;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        padding: 10px;
    }
`;

export const PurchasedItemName = styled.h2`
    color: ${theme.colors.primary};
    font-size: 2rem;
    font-weight: 600;

    display: -webkit-box;
    -webkit-line-clamp: var(--line-clamp, 1);
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const PurchasedItemDate = styled.p`
    margin-top: 5px;
    color: ${theme.colors.secondary};
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.4;
`;

export const PurchasedItemType = styled.div`
    display: flex;
    align-items: center;

    column-gap: 4px;
    margin-top: 12px;
`;

export const PurchasedItemTypeKey = styled.strong`
    color: ${theme.colors.textPrimary};
    font-size: 1.6rem;
    font-weight: 700;
`;

export const PurchasedItemTypeValue = styled.span`
    color: ${theme.colors.textPrimary};
    font-size: 1.4rem;
    font-weight: 400;
`;

export const PurchasedItemOwn = styled.div`
    margin-top: 10px;
`;

export const PurchasedItemOwnKey = styled.strong`
    color: ${theme.colors.textPrimary};
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.5%;
`;

export const PurchasedItemOwnValue = styled.p`
    max-width: 320px;
    color: ${theme.colors.textPrimary};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.5;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        max-width: 100%;
    }
`;

export const PurchasedItemButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    right: 0;
    width: 85px;
    height: 100%;
    background-color: ${theme.colors.primary};
    transition: ${theme.transition.primary};

    opacity: 0;
    visibility: hidden;
    transform: translateX(100%);

    ${({ theme }) => theme.breakpoints.down('lg')} {
        display: none;
    }
`;
