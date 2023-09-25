import { theme } from '@/themes';
import { Button, Image, Space, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const BannerWrapper = styled(Space)`
    justify-content: center;
    flex-direction: column;
    row-gap: 40px;
    position: relative;
    padding-top: 30px;
    width: 100%;

    & .ant-space-item {
        width: 100%;
        text-align: center;

        & > .ant-image {
            width: 100%;
        }
    }
`;

export const BannerHeading = styled(Title)`
    &.ant-typography {
        margin: 0 auto;
        max-width: 845px;
        text-align: center;
    }

    & span.ant-typography {
        font-size: 5.2rem;
        font-weight: 900;
        line-height: 1.38462;
    }

    & span.ant-typography:first-child {
        color: ${theme.colors.primary};
    }

    & span.ant-typography:nth-child(even) {
        margin: 0 8px;
        color: ${theme.colors.black};
    }

    & span.ant-typography:last-child {
        color: ${theme.colors.secondary};
    }
`;

export const BannerButton = styled(Button)`
    --height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 15px 26px;
    min-width: 236px;
    height: var(--height);
    line-height: var(--height);
    border: none;
    border-radius: 12px;
    background: ${theme.colors.primary};
    box-shadow: 0px 8px 25px -8px #ff7b29;

    & .ant-typography {
        color: ${theme.colors.white};
        font-size: 2rem;
        font-weight: 600;
    }

    &:hover {
        opacity: 0.9;
    }

    & span {
        flex: 1;
    }

    & svg {
        margin-left: 10px;
        transition: all 0.25s ease;
    }

    &:hover svg {
        transform: translateX(4px);
    }
`;

export const BannerImage = styled(Image)`
    &.ant-image-img {
        display: block;
        width: 100%;
        height: 533px;
        border-radius: 60px 60px 0px 0px;
        object-fit: cover;
    }
`;

export const BroomIcon = styled.img`
    position: absolute;
    top: 4px;
    right: 72px;
    width: 117px;
    height: 150px;
`;
