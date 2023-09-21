import styled from 'styled-components';
import { Typography, Form, Button, Image } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { theme } from '@/themes';
const { Title, Paragraph, Text } = Typography;

export const LoginFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    width: 412px;
    margin-left: auto;
    margin-right: auto;
`;

export const LoginTitle = styled(Title)`
    &.ant-typography {
        margin: 0;
        color: ${theme.colors.primary};
        font-size: 4rem;
        font-weight: 700;
        line-height: 1.4;
        text-align: center;
    }
`;

export const LoginDesc = styled(Paragraph)`
    &.ant-typography {
        margin-bottom: 14px;
        color: ${theme.colors.textLight};
        font-size: 1.5rem;
        line-height: 1.73333;
        text-align: center;
    }
`;

export const LoginBrand = styled(Text)`
    color: ${theme.colors.textLight};
    font-size: 1.5rem;
    line-height: 1.73333;
`;

export const LoginItem = styled(Form.Item)`
    &.ant-form-item {
        position: relative;
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

    .ant-form-item-control-input-content {
        min-width: 412px;
    }

    .ant-form-item-label {
        padding: 0;
        color: ${theme.colors.textDark};
        line-height: 1.625;
    }

    .ant-form-item-label label {
        font-size: 1.6rem;
        cursor: pointer;
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

export const LoginForgotPassword = styled(Text)`
    position: absolute;
    bottom: calc(100% + 8px);
    right: 0;
    z-index: 1;
    display: block;
    color: ${theme.colors.textDark};
    font-size: 1.6rem;
    line-height: 1.625;
    text-align: right;
    cursor: pointer;
`;

export const LoginButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    padding: 0 20px;
    min-width: 411px;
    height: 50px;
    line-height: 50px;
    color: ${theme.colors.white};
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: 0.18px;
`;

export const LoginDivider = styled.p`
    position: relative;
    color: ${theme.colors.textDark};
    font-size: 1.6rem;
    text-align: center;
    line-height: 1.625;

    &::after,
    &::before {
        content: '';
        position: absolute;
        display: block;
        background: #d9d9d9;
        width: 144px;
        height: 1px;
    }

    &::before {
        top: 50%;
        left: 0;
    }

    &::after {
        top: 50%;
        right: 0;
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
`;

export const LoginImage = styled(Image)`
    display: block;
    width: 100%;
    height: 640px;
    border-radius: 32px;
    object-fit: cover;
`;
