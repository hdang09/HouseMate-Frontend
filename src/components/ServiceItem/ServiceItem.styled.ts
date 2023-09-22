import { Button, Card, Image, Typography } from 'antd';

import styled from 'styled-components';
import { theme } from '@/themes';

const { Title } = Typography;

const CARD_WIDTH: string = '280px';

export const AddToCartBtn = styled(Button)`
    /* display: none; */
    display: flex;
    position: absolute;
    top: 50%;
    max-width: 150px;
    margin: auto;
    background-color: ${theme.colors.secondary};
`;

export const ServiceImage = styled(Image)`
    &.ant-image-img {
        width: ${CARD_WIDTH};
        height: ${CARD_WIDTH};
        object-fit: cover;
        border-radius: 12px;

        :hover {
        }
    }
`;

export const ServiceTitle = styled(Title)``;

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

export const ServiceCard = styled(Card)`
    width: ${CARD_WIDTH};

    &:hover ${ServiceTitle} {
        color: ${theme.colors.primary};
    }

    &:hover ${NewPrice} {
        color: ${theme.colors.secondary};
    }

    &:hover ${AddToCartBtn} {
        display: block;
    }
`;
