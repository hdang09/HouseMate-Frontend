import { Typography } from 'antd';
import styled, { css } from 'styled-components';
import { theme } from '@/themes';
import { Status } from '@/utils/enums';

const { Title, Text } = Typography;

export const TaskDetailSection = styled.section`
    padding: 16px 0 100px;
`;

export const TaskDetailHeading = styled.section`
    text-align: center;

    & h1.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.primary};
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.4;
    }

    & span.ant-typography {
        color: ${theme.colors.secondary};
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

        display: inline-block;
        margin-right: 4px;
        font-weight: 500;
    }
`;

export const TaskDetailTextValue = styled(Text)`
    &.ant-typography {
        ${TaskDetailText}

        font-weight: 400;
    }
`;

export const TaskDetailStatus = styled.span<{ $status: Status }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-width: 60px;
    height: 20px;
    line-height: 20px;
    padding: 0 14px;
    border-radius: 10px;
    border: 1px solid ${theme.colors.descTabBorder};

    color: ${theme.colors.textPrimary};
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25%;

    ${(props) =>
        props.$status === Status.DONE &&
        css`
            background: ${theme.colors.done};
        `}
`;
