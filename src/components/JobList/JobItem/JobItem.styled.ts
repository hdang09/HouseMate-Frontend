import { Typography } from 'antd';
import styled, { css } from 'styled-components';
import { theme } from '@/themes';
import { Status } from '@/utils/enums';

const { Text, Paragraph } = Typography;

export const JobItemWrapper = styled.article<{ $status: string }>`
    position: relative;
    display: flex;
    padding: 8px 10px;
    border-radius: 10px;
    background: ${theme.colors.white};
    box-shadow: 0px 24px 55px 0px ${theme.colors.shadowCartHover};
    border: 1px solid transparent;

    & img,
    & .ant-image-mask {
        border-radius: 5px;
    }

    ${(props) =>
        props.$status === Status.DONE &&
        css`
            border-color: ${theme.colors.success};
        `}

    ${(props) =>
        props.$status === Status.CANCEL &&
        css`
            border-color: ${theme.colors.error};
        `}

    ${(props) =>
        props.$status === Status.INCOMING &&
        css`
            border-color: ${theme.colors.warning};
        `}
`;

export const JobItemContent = styled.section`
    flex: 1;
    margin-left: 16px;
    text-align: left;
`;

export const JobItemText = css`
    padding-right: 12px;
    color: ${theme.colors.textSecondary};
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.75;
`;
export const JobItemHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & h2.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textPrimary};
        font-size: 1.2rem;
        font-weight: 700;
        line-height: 1.66667;
    }

    & .ant-typography {
        ${JobItemText}
    }
`;

export const JobItemTextSuccess = styled(Text)`
    &.ant-typography {
        color: ${theme.colors.success};
    }
`;

export const JobItemTextCancel = styled(Text)`
    &.ant-typography {
        color: ${theme.colors.error};
    }
`;

export const JobItemSubTitle = styled(Text)`
    display: block;
    color: ${theme.colors.primary};
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.77778;
`;

export const JobItemParagraph = styled(Paragraph)`
    &.ant-typography {
        line-height: 1.15;
        margin-bottom: 0;
        color: ${theme.colors.textSecondary};

        display: -webkit-box;
        -webkit-line-clamp: var(--line-clamp, 2);
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    & span.ant-typography {
        font-size: 0.9rem;
        font-weight: 500;
    }

    & span.ant-typography:first-child {
        margin-right: 4px;
        color: ${theme.colors.textPrimary};
    }

    & span.ant-typography:last-child {
        color: ${theme.colors.textSecondary};
    }
`;

export const JobItemLabel = styled.div`
    position: absolute;
    top: -5px;
    right: -7px;
`;
