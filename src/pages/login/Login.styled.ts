import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { theme } from '@/themes';

const { Paragraph } = Typography;

export const LoginDesc = styled(Paragraph)`
    &.ant-typography {
        margin: 16px 0 32px;
        color: ${theme.colors.textLight};
        font-size: 1.5rem;
        line-height: 1.73333;
        text-align: center;

        a {
            margin: 0 4px;
            font-weight: 700;
            color: ${theme.colors.textLight};
            transition: all 0.2s;

            span:first-child {
                font-size: inherit;
                color: ${theme.colors.primary};
            }

            span:last-child {
                font-size: inherit;
                color: ${theme.colors.secondary};
            }

            &:hover {
                color: ${theme.colors.primary};
            }
        }

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 1.4rem;
        }
    }
`;

export const LoginForgotPassword = styled(Link)`
    position: absolute;
    bottom: 308%;
    right: 0;
    z-index: 1;
    display: block;
    color: ${theme.colors.textDark};
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.625;
    text-align: right;
    transition: all 0.2s;

    &:hover {
        color: ${theme.colors.primary};
        cursor: pointer;
    }

    ${({ theme }) => theme.breakpoints.down('sm')} {
        font-size: 1.4rem;
    }
`;
