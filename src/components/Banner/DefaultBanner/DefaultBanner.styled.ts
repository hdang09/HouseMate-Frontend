import styled from 'styled-components';
import { theme } from '@/themes';
import { Button, Image, Space, Typography } from 'antd';

const { Title } = Typography;

export const BannerSection = styled.section`
    padding-top: 42px;
    background-color: ${theme.colors.white};

    ${({ theme }) => theme.breakpoints.down('sm')} {
        padding-top: 30px;
    }
`;

export const BannerWrapper = styled(Space)`
    position: relative;
    justify-content: center;
    flex-direction: column;
    row-gap: 40px;
    width: 100%;

    & .ant-space-item {
        width: 100%;
        text-align: center;

        & > .ant-image {
            width: 100%;
        }
    }

    & h1 > span.ant-typography:first-child::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        width: 290px;
        height: 197px;
        transform: rotate(-141deg);
        border-radius: 100%;
        background: linear-gradient(
            180deg,
            ${theme.colors.primary} 0%,
            ${theme.colors.primary} 96.6%
        );
        opacity: 0.7;
        filter: blur(200px);

        ${({ theme }) => theme.breakpoints.down('sm')} {
            width: 100px;
        }
    }

    & h1 > span.ant-typography:last-child::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 50px;
        left: 270px;
        width: 156px;
        height: 152px;
        transform: rotate(-136deg);
        border-radius: 100%;
        background: linear-gradient(
            180deg,
            ${theme.colors.secondary} 0%,
            ${theme.colors.secondary} 96.6%
        );
        opacity: 0.2;
        filter: blur(50px);

        ${({ theme }) => theme.breakpoints.down('lg')} {
            top: 0;
            left: 0;
        }

        ${({ theme }) => theme.breakpoints.down('sm')} {
            width: 100px;
        }
    }
`;

export const BannerHeading = styled(Title)`
    &.ant-typography {
        margin: 0 auto;
        text-align: center;
    }

    & span.ant-typography {
        position: relative;
        font-family: 'Poppins';
        font-size: 5.4rem;
        font-weight: 900;
        line-height: 1.38462;

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 3.6rem;
        }
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
    box-shadow: 0px 8px 25px -8px ${theme.colors.primary};

    & .ant-typography {
        color: ${theme.colors.white};
        font-size: 2rem;
        font-weight: 600;
    }

    & span {
        flex: 1;
    }

    & svg {
        margin-left: 10px;
        transition: ${theme.transition.primary};
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

        ${({ theme }) => theme.breakpoints.down('sm')} {
            border-radius: 40px 40px 0px 0px;
        }
    }
`;

export const BroomIcon = styled.img`
    position: absolute;
    top: 18px;
    right: 72px;
    width: 117px;
    height: 150px;

    ${({ theme }) => theme.breakpoints.down('xl')} {
        display: none;
    }
`;
