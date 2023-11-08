import { theme } from '@/themes';
import { Status } from '@/utils/enums';
import { Modal, Typography, Form, Image } from 'antd';
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
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 16px;
`;

export const FormText = styled.div`
    color: ${theme.colors.textPrimary};
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 0.5em;
    span {
        color: ${theme.colors.textSecondary};
    }
`;

export const FormParagraph = styled.div`
    color: ${theme.colors.textPrimary};
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 0.5em;

    span:first-child {
        font-size: inherit;
        color: ${theme.colors.primary};
    }

    span:last-child {
        font-size: inherit;
        color: ${theme.colors.secondary};
    }
`;

export const ModalText = styled(Text)``;

export const ModalParagraph = styled(Paragraph)``;

export const CreateServiceModal = styled(Modal)`
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
    border: 1px solid ${theme.colors.descTabBorder};

    color: ${theme.colors.textPrimary};
    font-size: 1.2rem;
    font-weight: 400;
    border-radius: 20px;
    padding: 10px 20px;
    ${(props) =>
        props.$status === Status.DONE &&
        css`
            background: ${theme.colors.done};
        `}

    ${(props) =>
        props.$status === Status.INCOMING &&
        css`
            background: ${theme.colors.incoming};
        `}

    ${(props) =>
        props.$status === Status.CANCEL &&
        css`
            background: ${theme.colors.cancel};
        `}

    ${(props) =>
        props.$status === Status.PENDING &&
        css`
            background: ${theme.colors.pending};
        `}

    ${(props) =>
        props.$status === Status.PROCESSING &&
        css`
            background: ${theme.colors.processing};
        `}
`;

export const ImageWrapper = styled.div`
    height: 60px;
    width: 300px;
    .swiper-slide {
        text-align: center;
        font-size: 1.8rem;
        background: ${theme.colors.white};

        /* Center slide text vertically */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .swiper-slide img {
        display: block;
        width: 80px;
        height: 60px;
        object-fit: cover;
    }

    .swiper-button-prev::after {
        font-size: 2rem;
        font-weight: 700;
        color: ${theme.colors.primary};
    }
    .swiper-button-prev {
        left: 3px;
    }

    .swiper-button-next::after {
        font-size: 2rem;
        font-weight: 700;
        color: ${theme.colors.primary};
    }
    .swiper-button-next {
        right: 3px;
    }

    .swiper {
        padding: 0 30px;
        margin-left: auto;
        margin-right: auto;
    }
`;

export const Picture = styled(Image)`
    width: 80px;
    height: 60px;
    border-radius: 4px;
    object-fit: cover;
`;
