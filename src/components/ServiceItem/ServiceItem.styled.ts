import { Card, Image, Typography } from 'antd';

import styled from 'styled-components';
import { theme } from '@/themes';

const { Title } = Typography;

const CARD_WIDTH: string = '280px';

export const ServiceCard = styled(Card)`
    width: ${CARD_WIDTH};
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

export const ServiceTitle = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
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
    color: ${theme.colors.secondary};
`;
