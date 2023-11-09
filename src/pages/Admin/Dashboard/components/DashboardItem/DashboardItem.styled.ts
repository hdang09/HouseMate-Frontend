import styled, { css } from 'styled-components';
import { Flex, Typography } from 'antd';
import { theme } from '@/themes';

interface ItemWrapperProps {
    $color: string;
}

const { Paragraph } = Typography;

export const ItemWrapper = styled(Flex)<ItemWrapperProps>`
    padding: 18px;
    background-color: ${theme.colors.white};
    border-radius: 8px;
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCart};
    transition: ${theme.transition.primary};

    &:hover {
        box-shadow: 0px 4px 4px 0px ${theme.colors.disabledPlaceholder};
    }

    & .ant-divider {
        margin: 14px 0;
        background-color: ${theme.colors.border};
    }

    & svg {
        ${(props) =>
            props.$color !== ''
                ? css`
                      color: ${props.$color};
                  `
                : css`
                      color: ${theme.colors.textPrimary};
                  `}
    }
`;

export const ItemData = styled(Flex)<ItemWrapperProps>`
    & .ant-statistic-title {
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;

        ${(props) =>
            props.$color !== ''
                ? css`
                      color: ${props.$color};
                  `
                : css`
                      color: ${theme.colors.textPrimary};
                  `}
    }

    & .ant-statistic-content-value {
        color: ${theme.colors.textPrimary};
        font-size: 2.4rem;
        font-weight: 400;
        line-height: 1.33333;
    }
`;

export const ItemRatio = styled(Paragraph)`
    margin: 0;
    color: ${theme.colors.textSecondary};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.57143;
`;
