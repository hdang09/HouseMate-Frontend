import { Collapse as CollapseAntd, Image, Progress, Typography } from 'antd';

import styled from 'styled-components';
import { theme } from '@/themes';

const { Text, Title } = Typography;

export const Wrapper = styled.div`
    margin-bottom: 60px;

    & .ant-image {
        width: 100%;
    }
`;

export const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export const ServiceImage = styled(Image)`
    &.ant-image-img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 4px;
    }
`;

export const ServiceTitle = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
        margin: 0;

        ${({ theme }) => theme.breakpoints.down('md')} {
            font-size: 3.4rem;
        }
    }
`;

export const ServiceSubTitle = styled(Title)`
    &.ant-typography {
        display: block;
        color: ${theme.colors.secondary};
        font-size: 2.8rem;
        font-weight: 600;
        margin-top: 10px;
    }
`;

export const ServiceType = styled(Text)`
    --font-size: 1.6rem;
    display: block;
    margin-top: 16px;

    &.ant-typography {
        font-size: var(--font-size);
    }

    strong {
        font-size: var(--font-size);
    }
`;

export const SeviceDescription = styled(Title)`
    &.ant-typography {
        font-size: 1.6rem;
        margin-bottom: 16px;

        &::after {
            content: ':';
        }
    }
`;

export const UsageItem = styled.div`
    display: flex;
    align-items: center;
`;

export const UsageProgress = styled(Progress)`
    flex: 1;
`;

export const UsageIcon = styled.div`
    width: 25px;
    margin-right: 6px;

    svg {
        font-size: 2rem;
    }
`;

export const UsageServiceName = styled(Text)`
    &.ant-typography {
        width: 300px;
        margin-right: 12px;

        ${({ theme }) => theme.breakpoints.down('md')} {
            width: 150px;
        }
    }
`;

export const UsageCount = styled.div`
    width: 120px;
    margin-left: 6px;

    ${({ theme }) => theme.breakpoints.down('md')} {
        width: 100px;
    }
`;

export const PrimaryText = styled(Text)`
    &.ant-typography {
        color: ${theme.colors.primary};
    }
`;

export const Collapse = styled(CollapseAntd)`
    & .ant-collapse-expand-icon {
        color: ${theme.colors.primary};
    }

    & .ant-collapse-item .ant-collapse-header {
        align-items: center;

        ${({ theme }) => theme.breakpoints.down('md')} {
            padding: 12px 0;
        }
    }

    & .ant-collapse-item .ant-collapse-header-collapsible-only .ant-collapse-header-text {
        flex: auto;
    }

    &.ant-collapse .ant-collapse-item-disabled > .ant-collapse-header {
        cursor: auto;
    }

    & .ant-collapse-extra {
        ${({ theme }) => theme.breakpoints.down('md')} {
            display: none;
        }
    }
`;
