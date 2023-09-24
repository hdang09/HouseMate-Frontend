import { Typography, Form, Button, Divider, Carousel, Image, Row } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import styled, { css } from 'styled-components';

import { theme } from '@/themes';

const { Title, Text } = Typography;

export const FormRow = styled(Row)`
    height: 100vh;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 412px;
    margin: 0 auto;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
    }

    ${({ theme }) => theme.breakpoints.down('lg')} {
        margin: 40px auto;
    }
`;

export const FormWrapper = styled(Form)`
    display: flex;
    flex-direction: column;
    row-gap: 32px;
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

export const FormItem = styled(Form.Item)`
    &.ant-form-item {
        margin-bottom: 0;
    }

    &.ant-form-item:last-child {
        margin: 24px 0 0;
    }

    & .ant-form-item-label {
        display: inline-block;
        width: fit-content;
        padding: 0;

        label {
            color: ${theme.colors.textDark};
            font-size: 1.6rem;
            line-height: 1.625;
            cursor: pointer;

            ${({ theme }) => theme.breakpoints.down('sm')} {
                font-size: 1.4rem;
            }

            &::after {
                content: unset;
            }
        }

        &:hover + .ant-form-item-control .ant-input-password {
            border-color: ${theme.colors.primary};
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
        padding: 12px 20px;
        border-radius: 15px;
        border-color: ${theme.colors.textDark};

        &:hover {
            border-color: ${theme.colors.primary};
        }
    }

    & .ant-form-item-explain-error {
        color: ${theme.colors.error};
        font-size: 1.4rem;
        line-height: 1.85714;
    }
`;

export const FormIcon = css`
    font-size: 2rem;
`;

export const EyeOutlinedIcon = styled(EyeOutlined)`
    ${FormIcon}
`;

export const EyeInvisibleOutlinedIcon = styled(EyeInvisibleOutlined)`
    ${FormIcon}
`;

export const FormButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: ${theme.colors.white};
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: 0.18px;

    &.ant-btn.ant-btn-primary:hover {
        background-color: ${theme.colors.secondary};
    }
`;

export const FormDivider = styled(Divider)`
    &.ant-divider {
        margin: 14px 0;
    }

    & .ant-divider-inner-text {
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
        background: ${theme.colors.divider};
    }
`;

export const FormIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & a:hover::before {
        width: 0;
    }

    & svg {
        cursor: pointer;
    }
`;

export const FormRedirect = styled(Text)`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;
    margin-top: 12px;
    text-align: center;
    color: ${theme.colors.textDark};
    font-size: 1.8rem;
    line-height: 1.44444;

    & a {
        &::after {
            content: attr(title);
            display: block;
            font-weight: 600;
            height: 0;
            overflow: hidden;
            visibility: hidden;
        }

        &:hover {
            font-weight: 600;
            text-align: center;
        }
    }

    ${({ theme }) => theme.breakpoints.down('sm')} {
        flex-direction: column;
        font-size: 1.6rem;
    }
`;

export const FormCarousel = styled(Carousel)`
    height: 700px;
    border-radius: 16px;
    overflow: hidden;
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
