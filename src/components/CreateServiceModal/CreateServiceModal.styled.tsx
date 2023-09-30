import { theme } from '@/themes';
import { Modal, Typography, Select } from 'antd';
import styled from 'styled-components';

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

export const ModalText = styled(Text)``;

export const ModalParagraph = styled(Paragraph)``;

export const CreateServiceModal = styled(Modal)`
    & .ant-modal-title {
        color: ${theme.colors.primary};
    }
`;

export const ModalSelect = styled(Select)`
    color: red;
`;

export const ModalField = styled.div`
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
