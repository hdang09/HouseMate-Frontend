import { Button, Image, Progress, Typography } from 'antd';

import styled from 'styled-components';
import { theme } from '@/themes';

const { Text, Title } = Typography;

export const Wrapper = styled.div`
    margin-bottom: 24px;

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
    }
`;

export const ServiceDate = styled(Text)`
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

export const SeviceCurrentOwn = styled(Title)`
    &.ant-typography {
        font-size: 1.6rem;
        margin-bottom: 16px;
    }
`;

export const UsageItem = styled.div`
    display: flex;
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
        width: 175px;
        margin-right: 12px;
    }
`;

export const UsageCount = styled.div`
    width: 75px;
    margin-left: 6px;
`;

export const UsageRemaining = styled(Text)`
    &.ant-typography {
        color: ${theme.colors.primary};
    }
`;

export const CancelButton = styled(Button)`
    background-color: ${theme.colors.error};
`;
