import { Typography, Form, Button, Carousel, Image, Row } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';

import Link from '@/components/Link';
import { theme } from '@/themes';

const { Title, Text } = Typography;

export const AuthForm = styled.div`
    display: flex;
    position: fixed;
    inset: 0;
    overflow-y: auto;
`;

export const FormRow = styled(Row)`
    margin: auto;
    position: relative;
    width: 1066px;
    height: 700px;
    padding: 24px;
    border-radius: 30px;
    background: ${theme.colors.white};
    box-shadow: 0px 4px 24px 0px ${theme.colors.shadow};
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 370px;
    margin: 0 auto;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
    }
`;

export const FormWrapper = styled(Form)`
    display: flex;
    flex-direction: column;
    row-gap: 44px;
`;

export const FormTitle = styled(Title)`
    &.ant-typography {
        margin-bottom: 30px;
        color: ${theme.colors.primary};
        font-size: 3.6rem;
        font-weight: 600;
        line-height: 1.3;
        text-align: center;
    }
`;

export const FormItem = styled(Form.Item)`
    &.ant-form-item {
        margin-bottom: 0;
    }

    &.ant-form-item:last-child {
        margin-top: 12px;
    }

    & .ant-form-item-row {
        position: relative;

        &:has(.ant-form-item-explain-error:not(:empty)) .ant-form-item-label label {
            color: ${theme.colors.error};
        }

        &:has(input:-webkit-autofill),
        &:has(input:-webkit-autofill:hover),
        &:has(input:-webkit-autofill:focus),
        &:has(input:not(:placeholder-shown)),
        &:has(input:focus) {
            & .ant-form-item-label {
                top: -2px;
                left: 10px;
                padding: 0 10px;
                background-color: ${theme.colors.white};

                & label {
                    color: ${theme.colors.primary};
                }
            }
        }
    }

    & .ant-form-item-label {
        position: absolute;
        z-index: 10;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        padding: 0;
        user-select: none;
        pointer-events: none;
        transition: all 0.25s ease;

        & label {
            color: ${theme.colors.textLight};
            font-size: 1.6rem;
            font-weight: 400;
            line-height: 1.75;

            &::after {
                display: none;
            }
        }
    }

    & .ant-form-item-control {
        position: relative;

        & .ant-form-item-control-input + div {
            position: absolute;
            top: 100%;
            left: 0;
        }
    }

    & .ant-input,
    & .ant-input-password {
        padding: 14px 20px;
        font-size: 1.6rem;
        line-height: 1;
        border-radius: 6px;
        border-color: ${theme.colors.border};

        &:hover,
        &:focus {
            border-color: ${theme.colors.primary};
        }
    }

    & .ant-form-item-explain-error {
        margin-top: 4px;
        color: ${theme.colors.error};
        font-size: 1.4rem;
        line-height: 1.85714;
        font-weight: 400;
        line-height: 1.5;
    }
`;

export const FormIcon = css`
    & svg {
        font-size: 2rem;
        transition: all 0.25s ease;
    }

    &:hover svg {
        color: ${theme.colors.primary};
    }
`;

export const EyeOutlinedIcon = styled(EyeOutlined)`
    ${FormIcon}
`;

export const EyeInvisibleOutlinedIcon = styled(EyeInvisibleOutlined)`
    ${FormIcon}
`;

export const ButtonStyled = css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 1.8rem;
    font-weight: 500;
    border-radius: 6px;
    letter-spacing: 0.18px;
    text-transform: uppercase;
`;

export const FormButton = styled(Button)`
    ${ButtonStyled}
    color: ${theme.colors.white};

    &.ant-btn.ant-btn-primary:hover {
        background-color: ${theme.colors.secondary};
    }
`;

export const FormGoogleButton = styled(Link)`
    ${ButtonStyled}
    column-gap: 10px;
    margin-top: 24px;
    border: 1px solid ${theme.colors.border};

    & span {
        color: ${theme.colors.textDark};
    }

    &::before {
        content: unset;
    }
`;

export const FormRedirect = styled(Text)`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;
    margin-top: 24px;
    color: ${theme.colors.textDark};
    font-size: 1.8rem;
    line-height: 1.44444;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        flex-direction: column;
    }
`;

export const FormForgotPassword = styled(Link)`
    display: block;
    margin: 24px auto;
    font-size: 1.8rem;
    color: ${theme.colors.secondary};

    &:hover {
        color: ${theme.colors.secondary};
    }

    &::before,
    &:hover::before {
        background-color: ${theme.colors.secondary};
    }
`;

export const FormCarousel = styled(Carousel)`
    width: 497px;
    height: 652px;
    border-radius: 6px;
    overflow: hidden;
    user-select: none;
`;

export const FormImageWrapper = styled.div`
    position: relative;
`;

export const FormImageOverlay = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1;
    height: 100%;
    background: ${theme.colors.overlay};
`;

export const FormImage = styled(Image)`
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
`;
