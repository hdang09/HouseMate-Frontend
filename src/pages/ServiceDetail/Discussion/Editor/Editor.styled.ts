import { Button, Input } from 'antd';
import styled from 'styled-components';
import { theme } from '@/themes';

const { TextArea } = Input;

export const CommentInput = styled(TextArea)`
    &.ant-input-affix-wrapper {
        border-radius: 2px;
        border: 1px solid ${theme.colors.borderInput};
        background: ${theme.colors.white};
    }

    &.ant-input-affix-wrapper textarea.ant-input {
        padding: 12px 16px;
        font-size: 1.6rem;
        background: ${theme.colors.white};
    }
`;

export const CommentButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 130px;
    height: 36px;
    border-radius: 2px;
    border: 1px solid ${theme.colors.primary};
    background: ${theme.colors.primary};
    box-shadow: 0px 2px 0px 0px ${theme.colors.shadowButton};

    & span {
        color: ${theme.colors.white};
        text-align: center;
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
    }
`;
