import { InputNumber, Select } from 'antd';
import styled from 'styled-components';
import { theme } from '@/themes';
import { RiDeleteBin7Line } from 'react-icons/ri';
import Link from '@/components/Link';

export const CartSection = styled.section`
    padding: 50px 0;

    & .ant-table-wrapper .ant-table-thead > tr th {
        border-bottom: 1px solid ${theme.colors.primary};

        &:nth-last-child(2) {
            text-align: center;
        }
    }

    & .ant-table-wrapper .ant-table-tbody .ant-table-row.ant-table-row-selected > .ant-table-cell {
        background-color: ${theme.colors.white};
    }

    ${({ theme }) => theme.breakpoints.down('lg')} {
        & .cart-service__total-wrapper {
            position: sticky;
            bottom: 0;
        }
    }
`;

export const CartTitle = styled.h2`
    display: flex;
    align-items: flex-end;
    column-gap: 8px;
    margin-bottom: 24px;

    & span.ant-typography:first-child {
        color: ${theme.colors.textPrimary};
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.33333;
    }

    & span.ant-typography:last-child {
        color: ${theme.colors.textSecondary};
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.4;
    }
`;

export const CartServiceInfo = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 16px;

    & .ant-image-img {
        width: 55px;
        border-radius: 10px;
    }

    & span.ant-typography {
        min-width: 120px;
        color: ${theme.colors.textPrimary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
        text-align: left;

        display: -webkit-box;
        -webkit-line-clamp: var(--line-clamp, 1);
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;

export const CartServiceVariant = styled(Select)`
    & .ant-select-selector {
        border-radius: 2px;
    }
`;

export const CartServiceQuantity = styled(InputNumber)`
    border-radius: 2px;
`;

export const CartServicePrice = styled.div`
    min-width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 6px;

    & span.ant-typography {
        font-weight: 400;
        line-height: 1.57143;
    }

    & span.ant-typography:first-child {
        color: ${theme.colors.textSecondary};
        font-size: 1.2rem;
    }

    & span.ant-typography:last-child {
        color: ${theme.colors.textPrimary};
        font-size: 1.4rem;
    }
`;

export const CartServiceDelIcon = styled(RiDeleteBin7Line)`
    transition: ${theme.transition.primary};

    &:hover {
        color: ${theme.colors.error};
    }
`;

export const CartServiceCalPrice = styled.div`
    position: sticky;
    top: 128px;
    padding: 36px 34px 25px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.descTabBorder};
    background-color: ${theme.colors.white};

    ${({ theme }) => theme.breakpoints.down('lg')} {
        border-radius: 0;
    }

    ${({ theme }) => theme.breakpoints.down('lg')} {
        padding: 24px;
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        padding: 16px;
    }

    & h3.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textSecondary};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.5;

        ${({ theme }) => theme.breakpoints.down('lg')} {
            font-size: 1.4rem;
        }
    }

    & span.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.4;

        ${({ theme }) => theme.breakpoints.down('lg')} {
            font-size: 1.6rem;
        }
    }

    & .ant-space:first-of-type {
        margin-bottom: 32px;

        ${({ theme }) => theme.breakpoints.down('lg')} {
            margin-bottom: 0;
        }
    }

    & .ant-space:nth-of-type(2) {
        ${({ theme }) => theme.breakpoints.down('lg')} {
            display: none;
        }
    }

    & .ant-space:last-of-type {
        & h3.ant-typography {
            color: ${theme.colors.textPrimary};
            font-size: 1.6rem;
            font-weight: 400;
            line-height: 1.5;

            ${({ theme }) => theme.breakpoints.down('lg')} {
                font-size: 1.4rem;
            }
        }
    }

    & .ant-space {
        justify-content: space-between;
        width: 100%;
    }

    & .ant-divider {
        margin: 32px 0;

        ${({ theme }) => theme.breakpoints.down('lg')} {
            margin: 16px 0;
        }
    }

    & .ant-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 32px;
        padding: 0 100px;
        height: 50px;
        line-height: 50px;
        border-radius: 2px;

        color: ${theme.colors.white};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.57143;

        box-shadow: 0px 2px 0px 0px ${theme.colors.shadowButton};

        ${({ theme }) => theme.breakpoints.down('lg')} {
            height: 46px;
        }

        ${({ theme }) => theme.breakpoints.down('md')} {
            margin-top: 16px;
        }
    }
`;
