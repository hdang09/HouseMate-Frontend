import styled from 'styled-components';
import { Typography, Form, Button, Divider, Image } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { theme } from '@/themes';
import { Link } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

export const LoginFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    width: 412px;
    margin-left: auto;
    margin-right: auto;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
    }

    ${({ theme }) => theme.breakpoints.down('lg')} {
        margin-top: 40px;
        margin-bottom: 40px;
    }
`;

export const FormTitle = styled(Title)`
    &.ant-typography {
        margin: 0;
        color: ${theme.colors.primary};
        font-size: 4rem;
        font-weight: 700;
        line-height: 1.4;
        text-align: center;

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 3.2rem;
        }
    }
`;

export const LoginDesc = styled(Paragraph)`
    &.ant-typography {
        margin-bottom: 14px;
        color: ${theme.colors.textLight};
        font-size: 1.5rem;
        line-height: 1.73333;
        text-align: center;

        a {
            font-weight: 700;
            color: ${theme.colors.textLight};

            &:hover {
                color: ${theme.colors.primary};
            }
        }

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 1.3rem;
        }
    }
`;

export const LoginBrand = styled(Link)`
    font-size: 1.5rem;
    line-height: 1.73333;
`;

export const FormItem = styled(Form.Item)`
    &.ant-form-item {
        margin-bottom: 36px;
    }

    &.ant-form-item:last-child {
        margin-bottom: 0;
    }

    .ant-form-item-row {
        row-gap: 8px;
    }

    .ant-form-item-control-input {
        margin-bottom: 4px;
    }

    .ant-form-item-label {
        padding: 0;
        color: ${theme.colors.textDark};
        line-height: 1.625;
    }

    .ant-form-item-label label {
        font-size: 1.6rem;
        cursor: pointer;

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 1.4rem;
        }
    }

    .ant-input,
    .ant-input-password {
        padding: 12px 20px;
        border-radius: 15px;
        border-color: ${theme.colors.textDark};

        &:hover {
            border-color: ${theme.colors.primary};
        }
    }

    .ant-form-item-explain-error {
        color: #f00;
        font-size: 1.4rem;
        line-height: 1.85714;
    }
`;

export const EyeOutlinedStyled = styled(EyeOutlined)`
    font-size: 20px;
`;

export const EyeInvisibleOutlinedStyled = styled(EyeInvisibleOutlined)`
    font-size: 20px;
`;

export const LoginForgotPassword = styled(Link)`
    position: absolute;
    bottom: 254%;
    right: 0;
    z-index: 1;
    display: block;
    color: ${theme.colors.textDark};
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.625;
    text-align: right;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        font-size: 1.4rem;
    }
`;

export const LoginButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    padding: 0 20px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: ${theme.colors.white};
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: 0.18px;
`;

export const LoginDivider = styled(Divider)`
    .ant-divider-inner-text {
        position: relative;
        color: ${theme.colors.textDark};
        font-size: 1.6rem;
        text-align: center;
        line-height: 1.625;

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 1.4rem;
        }
    }

    &::after,
    &::before {
        background: #d9d9d9;
    }
`;

export const LoginIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 56px;

    & > svg {
        cursor: pointer;
    }
`;

export const LoginNotMember = styled(Text)`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;
    margin-top: 32px;
    text-align: center;
    color: ${theme.colors.textDark};
    font-size: 1.8rem;
    line-height: 1.44444;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        flex-direction: column;
        font-size: 1.6rem;
    }
`;

export const LoginImage = styled(Image)`
    display: block;
    width: 100%;
    height: 640px;
    border-radius: 32px;
    object-fit: cover;
`;
