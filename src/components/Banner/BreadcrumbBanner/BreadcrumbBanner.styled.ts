import { Image, Typography } from 'antd';
import styled, { css } from 'styled-components';
import { theme } from '@/themes';

const { Title } = Typography;

export const BreadcrumbBannerSection = styled.section`
    padding: 10px 0 46px;
`;

export const BreadcrumbBannerInner = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ant-breadcrumb li,
    .ant-breadcrumb-link a {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ant-breadcrumb li:last-child .ant-breadcrumb-link {
        color: ${theme.colors.primary};
    }

    .ant-breadcrumb-link {
        color: ${theme.colors.textSecondary};
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 1;
    }

    .ant-breadcrumb a:hover {
        color: ${theme.colors.secondary};
        background-color: transparent;
    }
`;

export const BreadcrumbBannerTitle = styled(Title)`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    & .ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 5.4rem;
        font-weight: 700;
        line-height: 1.3;
    }
`;

export const BreadcrumbBannerBrand = styled.div`
    display: flex;
    align-items: center;

    & .ant-typography:nth-child(1) {
        position: relative;
        color: ${theme.colors.primary};

        &::after {
            content: '';
            display: block;
            position: absolute;
            top: -32px;
            left: -68px;
            z-index: -1;
            width: 310px;
            height: 135px;
            transform: rotate(-6deg);
            border-radius: 100%;
            background-color: ${theme.colors.primary};
            filter: blur(200px);
        }
    }

    & .ant-typography:nth-child(2) {
        position: relative;
        color: ${theme.colors.secondary};

        &::after {
            content: '';
            display: block;
            position: absolute;
            top: -6px;
            left: 40px;
            z-index: -1;
            width: 200px;
            height: 80px;
            transform: rotate(-4deg);
            border-radius: 100%;
            background-color: #31c3e0;
            opacity: 0.3;
            filter: blur(50px);
        }
    }
`;

export const BreadcrumbBannerImage = styled(Image)<{ $isImage: boolean }>`
    &.ant-image-img {
        display: block;
        width: 653px;
        height: 355px;
        object-fit: cover;
        border-radius: 0px 225px;

        ${(props) =>
            props.$isImage &&
            css`
                border-radius: 0px;
            `}
    }
`;
