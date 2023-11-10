import { Button, Typography } from 'antd';
import styled, { css } from 'styled-components';
import { theme } from '@/themes';
import { TaskStatus } from '@/utils/enums';

const { Title, Text } = Typography;

export const TaskDetailSection = styled.section`
    padding: 16px 0 100px;

    & .ant-divider {
        margin: 8px 0;
    }
`;

export const TaskDetailHeading = styled.section`
    text-align: center;

    & h1.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.secondary};
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.4;
    }

    & span.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
    }
`;

export const TaskDetailContent = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    margin-top: 22px;
`;

export const TaskDetailInfo = styled.div`
    & li {
        margin-left: 16px;
        font-size: 1rem;
    }
`;

export const TaskDetailText = css`
    margin-bottom: 0;
    color: ${theme.colors.textPrimary};
    font-size: 1.2rem;
    line-height: 1.83333;
`;

export const TaskDetailTextKey = styled(Title)`
    &.ant-typography {
        ${TaskDetailText}

        color: ${theme.colors.textQuaternary};

        display: inline-block;
        margin-right: 6px;
        font-weight: 400;
    }
`;

export const TaskDetailTextValue = styled(Text)`
    &.ant-typography {
        ${TaskDetailText}
        font-size: 1.4rem;
        font-weight: 500;
    }
`;

export const TaskDetailPhoneValue = styled(Text)`
    &.ant-typography {
        ${TaskDetailText}
        color: ${theme.colors.primary};
        font-size: 1.4rem;
        font-weight: 500;
        text-decoration: underline;
    }
`;

export const TaskDetailDateValue = styled(Text)`
    &.ant-typography {
        ${TaskDetailText}
        color: ${theme.colors.primary};
        font-size: 1.4rem;
        font-weight: 600;
    }
`;

export const TaskDetailStatus = styled.span<{ $status: TaskStatus }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-width: 60px;
    height: 20px;
    line-height: 20px;
    padding: 0 14px;
    border-radius: 10px;
    border: 1px solid ${theme.colors.descTabBorder};

    color: ${theme.colors.white};
    font-size: 1.2rem;
    font-weight: 400;

    ${(props) =>
        props.$status === TaskStatus.PENDING_WORKING &&
        css`
            background-color: ${theme.colors.pending};
        `}

    ${(props) =>
        props.$status === TaskStatus.INCOMING &&
        css`
            background-color: ${theme.colors.incoming};
        `}

    ${(props) =>
        props.$status === TaskStatus.ARRIVED &&
        css`
            background-color: ${theme.colors.info};
        `}

    ${(props) =>
        props.$status === TaskStatus.DOING &&
        css`
            background-color: ${theme.colors.warning};
        `}

    ${(props) =>
        props.$status === TaskStatus.DONE &&
        css`
            background-color: ${theme.colors.success};
        `}

    ${(props) => {
        const status = props.$status as TaskStatus;
        if (
            status === TaskStatus.CANCELLED_BY_CUSTOMER ||
            status === TaskStatus.CANCELLED_BY_STAFF ||
            status === TaskStatus.CANCELLED_CAUSE_NOT_FOUND_STAFF
        ) {
            return css`
                background-color: ${theme.colors.error};
            `;
        }
    }}
`;

export const TaskDetailButton = styled(Button)`
    margin-top: 100px;
    border-radius: 4px;
    color: ${theme.colors.white};
    background-color: ${theme.colors.primary};
`;
