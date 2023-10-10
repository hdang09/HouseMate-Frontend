import { Button, Typography } from 'antd';
import styled, { css } from 'styled-components';
import { theme } from '@/themes';

const { Paragraph } = Typography;

export const ServiceDetailSection = styled.section`
    padding: 46px 0 50px;
`;

export const ServiceDetailImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > .ant-image img,
    & > .ant-image-mask {
        width: 570px;
        border-radius: 5px;

        ${({ theme }) => theme.breakpoints.down('md')} {
            width: 100%;
        }
    }

    .ant-image-mask-info {
        font-size: 2rem;
    }
`;

export const ServiceDetailImageList = styled.div`
    max-width: 570px;
    margin-top: 16px;

    ${({ theme }) => theme.breakpoints.down('md')} {
        max-width: 100%;
    }
`;

export const ServiceDetailContent = styled.div`
    max-width: 510px;

    ${({ theme }) => theme.breakpoints.down('xl')} {
        max-width: 570px;
        width: auto;
        margin: auto;
    }

    & h2.ant-typography {
        color: ${theme.colors.primary};
        font-size: 3.8rem;
        font-weight: 500;
        line-height: 1.21;
    }

    & .ant-space-item {
        display: flex;

        & .ant-typography {
            color: ${theme.colors.textPrimary};
            font-size: 1.4rem;
            font-weight: 400;
            line-height: 1.57143;
        }
    }

    & .ant-form-item {
        margin-bottom: 0;
    }
`;

export const ServiceDetailReviewWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 8px;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        flex-direction: column;
        align-items: flex-start;
        row-gap: 8px;

        & .ant-divider {
            display: none;
        }
    }

    & div.ant-typography {
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 4px;
        margin-bottom: 0;
        color: ${theme.colors.textPrimary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;

        & span.ant-typography:last-child {
            color: ${theme.colors.textSecondary};
        }
    }

    & .ant-divider {
        height: 20.5px;
    }
`;

export const ServiceDetailPrice = styled.p`
    margin: 25px 0 8px;

    & span.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 3rem;
        font-weight: 500;
        line-height: 1.33333;
    }
`;

export const ServiceDetailPeriod = styled.div`
    margin-top: 8px;

    & div.ant-typography {
        margin-bottom: 32px;
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.5;
    }
`;

export const ServiceDetailPeriodCta = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 85px;
    height: 40px;
    padding: 10px 17px;
`;

export const ServiceDetailQuantity = styled.div`
    display: flex;
    align-items: center;
    column-gap: 36px;
    margin: 32px 0 8px;

    & .ant-typography {
        margin-bottom: 0;
        font-size: 1.6rem;
        color: ${theme.colors.textPrimary};
        font-weight: 500;
        line-height: 1.5;
    }

    & .ant-input-number-input-wrap input {
        min-width: 90px;
        height: 40px;
        padding: 4px 12px;
        color: ${theme.colors.textPrimary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
    }
`;

export const ServiceDetailText = styled(Paragraph)`
    margin-top: 8px;

    & .ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.3rem;
        font-weight: 400;
        line-height: 1.31;
    }
`;

export const ServiceDetailButtonWrapper = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    row-gap: 32px;

    & button.ant-btn {
        min-width: 469px;
        height: 50px;
        padding: 8px 15px;
        border-radius: 2px;
        color: ${theme.colors.white};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.5;
        box-shadow: 0px 2px 0px 0px ${theme.colors.shadowButton};

        ${({ theme }) => theme.breakpoints.down('sm')} {
            min-width: 100%;
        }
    }

    & button.ant-btn:last-child {
        border: 1px solid ${theme.colors.secondary};
        background: ${theme.colors.secondary};
        box-shadow: 0px 2px 0px 0px ${theme.colors.shadowButton};

        &:hover {
            color: ${theme.colors.secondary};
        }
    }
`;

export const ServiceDetailTabs = styled.section`
    padding: 50px 0;

    & .ant-tabs-nav {
        margin-bottom: 56px;

        & .ant-tabs-nav-more {
            min-width: 160px;
            margin-left: 10px;

            ${({ theme }) => theme.breakpoints.down('sm')} {
                min-width: 100%;
            }
        }
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        & .ant-tabs .ant-tabs-nav .ant-tabs-nav-wrap {
            justify-content: flex-start;
        }
    }

    & .ant-tabs-nav-list {
        column-gap: 230px;

        ${({ theme }) => theme.breakpoints.down('xl')} {
            column-gap: 130px;
        }

        ${({ theme }) => theme.breakpoints.down('lg')} {
            column-gap: 30px;
        }

        ${({ theme }) => theme.breakpoints.down('sm')} {
            column-gap: 0;
        }
    }

    & .ant-tabs-tab-btn {
        color: ${theme.colors.textPrimary};
        font-size: 2rem;
        font-weight: 400;
        line-height: 2;

        ${({ theme }) => theme.breakpoints.down('md')} {
            font-size: 1.8rem;
        }

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 1.6rem;
        }
    }

    & .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
        height: 4px;
        background-color: ${theme.colors.primary};
    }

    & .ant-badge-count {
        height: 100%;
        margin-left: 8px;
        padding: 6px 12px;
        border-radius: 200px;
        background: ${theme.colors.descTabBorder};

        color: ${theme.colors.textSecondary};
        text-align: center;
        font-size: 1.8rem;
        font-weight: 400;

        ${({ theme }) => theme.breakpoints.down('lg')} {
            padding: 2px 8px;
        }

        ${({ theme }) => theme.breakpoints.down('md')} {
            font-size: 1.6rem;
        }

        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 1.4rem;
        }
    }

    & .ant-tabs-tab-active {
        & .ant-badge-count {
            background: ${theme.colors.primary};
            color: ${theme.colors.white};
        }
    }
`;

export const ServiceDetailTabItem = css`
    padding: 40px 45px;
    border-radius: 15px;
    border: 1px solid ${theme.colors.descTabBorder};
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCart};

    & h2.ant-typography {
        margin-bottom: 23px;
        color: ${theme.colors.textPrimary};
        font-size: 2.4rem;
        font-weight: 500;
        line-height: 1.33333;
    }

    ${({ theme }) => theme.breakpoints.down('sm')} {
        padding: 40px 24px;
    }
`;
