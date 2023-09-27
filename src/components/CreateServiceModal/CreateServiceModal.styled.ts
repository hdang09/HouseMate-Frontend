import { theme } from '@/themes';
import { Modal, Typography } from 'antd';
import styled from 'styled-components';

const { Title, Paragraph, Text } = Typography;

export const ModalTitle = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.characterPrimary};
        font-size: 1.4rem;
        font-style: normal;
        font-weight: 700;
        line-height: 22px; /* 157.143% */
    }
`;

export const ModalText = styled(Text)``;

export const ModalParagraph = styled(Paragraph)``;

export const CreateServiceModal = styled(Modal)`
    & .ant-modal-title {
        color: ${theme.colors.primary};
    }
`;
