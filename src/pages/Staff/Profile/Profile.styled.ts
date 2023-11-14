import { theme } from '@/themes';
import { Button, DatePicker, Form, Typography } from 'antd';
import styled, { css } from 'styled-components';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export const ProfileHeader = styled.div`
    margin-top: 24px;
    text-align: center;
`;

export const ProfileName = styled(Title)`
    &.ant-typography {
        margin-top: 6px;
        margin-bottom: 0;
        color: ${theme.colors.textPrimary};
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 1.5;
    }
`;

export const ProfileText = css`
    color: ${theme.colors.textPrimary};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.83333;
`;

export const ProfileJobPosition = styled(Text)`
    &.ant-typography {
        ${ProfileText}
    }
`;

export const ProfilePoint = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;

    & span.ant-typography {
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.83333;
    }

    & span.ant-typography:first-child {
        color: ${theme.colors.primary};
    }

    & span.ant-typography:last-child {
        color: ${theme.colors.secondary};
        font-weight: 500;
    }
`;

export const ProfileBody = styled.div`
    margin-top: 32px;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
`;

export const ProfileContentWrapper = styled.article``;

export const ProfileContentTitle = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.5;
    }
`;

export const ProfileContent = styled.div`
    padding: 12px 22px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.secondary};
`;

export const ProfileTextKey = styled(Text)`
    &.ant-typography {
        ${ProfileText}
    }
`;

export const ProfileTextValue = styled(Text)`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 4px;

    & span.ant-typography {
        ${ProfileText}
    }

    & span.ant-typography:first-child {
        color: ${theme.colors.primary};
    }
`;

export const RangePickerStyled = styled(RangePicker)`
    & .ant-picker-input input {
        color: ${theme.colors.textPrimary};
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 1.57143;
    }
`;

export const ProfileForm = styled(Form)`
    margin: 16px 0;

    & .ant-form-item-control-input-content input,
    & .ant-form-item-control-input-content textarea,
    & .ant-form-item-label label {
        ${ProfileText}
    }

    & .ant-form-item-explain-error {
        font-size: 1.2rem;
    }
`;

export const ProfileButton = styled(Button)`
    margin-left: auto;
`;
