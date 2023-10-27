import { theme } from '@/themes';
import { Status } from '@/utils/enums';
import { Modal, Typography, Form, Tag, Image } from 'antd';
import styled, { css } from 'styled-components';

const { Title, Paragraph, Text } = Typography;

export const ModalTitle = styled(Title)`
    width: 110px;
    &.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.4rem;
        font-style: normal;
        font-weight: 700;
        line-height: 22px; /* 157.143% */
        margin-bottom: 0;
    }
`;

export const FormTitle = styled(Paragraph)`
    color: ${theme.colors.textPrimary};
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 16px;
`;

export const FormText = styled(Text)`
    color: ${theme.colors.textPrimary};
    font-size: 14px;
    font-weight: 400;
`;

export const FormParagraph = styled(Paragraph)`
    color: ${theme.colors.textPrimary};
    font-size: 14px;
    font-weight: 400;
`;

export const ModalText = styled(Text)``;

export const ModalParagraph = styled(Paragraph)``;

export const ServiceModal = styled(Modal)`
    & .ant-modal-title {
        color: ${theme.colors.primary};
    }
`;

export const ServiceForm = styled(Form)`
    & .ant-form-item-row:last-child {
        flex-wrap: wrap;
    }

    & .ant-form-item-control-input-content:last-child {
        width: 500px;
        max-width: 100%;
    }

    & .ant-form-item-label label {
        width: 120px;
    }

    .ant-row {
        margin-bottom: 24px;
    }
`;

export const FormField = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;

    &:last-child {
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-bottom: 16px;
    }
`;

export const Avatar = styled(Image)`
    object-fit: cover;
    border-radius: 4px;
`;

export const StatusTag = styled.span<{ $status: Status }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-width: 60px;
    height: 20px;
    line-height: 20px;
    padding: 0 14px;
    border-radius: 10px;
    border: 1px solid ${theme.colors.descTabBorder};

    color: ${theme.colors.textPrimary};
    font-size: 1rem;
    font-weight: 400;

    ${(props) =>
        props.$status === Status.DONE &&
        css`
            background: ${theme.colors.done};
        `
         props.$status === Status.INCOMING &&
        css`
            background: ${theme.colors.done};
        `
    }
`;
