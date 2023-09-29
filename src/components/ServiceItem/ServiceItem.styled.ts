import { Badge, Button, Card, Image, Rate, Typography } from 'antd';

import Link from '@/components/Link';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { theme } from '@/themes';

const { Title, Text } = Typography;
const { Ribbon } = Badge;

export const SaleRibbon = styled(Ribbon)<{ $isSale: boolean }>`
    visibility: ${(props) => (props.$isSale ? 'visible' : 'hidden')};
`;

export const LinkCard = styled(Link)`
    text-align: left;
    display: flex;
    justify-content: center;
`;

export const LinkButton = styled(Link)`
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
        font-weight: 600;
        max-width: 150px;
        margin: auto;
        background-color: ${theme.colors.secondary};
    }
`;

export const ServiceImage = styled(Image)`
    &.ant-image-img {
        object-fit: cover;
        border-radius: 12px;
    }
`;

export const ServiceTitle = styled(Title)`
    height: 50px;

    &.ant-typography {
        font-size: 1.8rem;
        display: -webkit-box;
        -webkit-line-clamp: var(--line-clamp, 2);
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;

const Price = styled.span`
    display: block;
    margin-bottom: 16px;

    &::before {
        content: '$';
    }
`;

export const OldPrice = styled(Price)`
    color: ${theme.colors.grey};
    text-decoration: line-through;
`;

export const NewPrice = styled(Price)`
    color: ${theme.colors.primary};
`;

export const ServiceCard = styled(Card)<{ $width: number }>`
    width: ${(props) => `${props.$width}px`};

    &:hover ${ServiceTitle} {
        color: ${theme.colors.primary};
    }

    &:hover ${NewPrice} {
        color: ${theme.colors.secondary};
    }

    &:hover ${AddToCartBtn} {
        opacity: 1;
        transform: translateY(0);
    }

    & .ant-card-cover {
        position: relative;
    }
`;

export const CartIcon = styled(ShoppingCartOutlined)`
    font-size: 2.4rem;
`;

export const Rating = styled(Rate)`
    &.ant-rate .ant-rate-star {
        font-size: 1.8rem;
        margin-inline-end: 4px;

        ${({ theme }) => theme.breakpoints.between('xl', 'xxl')} {
            font-size: 1.4rem;
            margin-inline-end: 2px;
        }
    }
`;

export const TotalSold = styled(Text)`
    &::after {
        content: ' sold';
    }

    ${({ theme }) => theme.breakpoints.between('xl', 'xxl')} {
        &::before {
            content: '(';
        }

        &::after {
            content: ')';
        }
    }
`;
