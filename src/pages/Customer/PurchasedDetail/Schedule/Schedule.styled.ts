import { Space, Typography } from 'antd';

import { Calendar as CalendarRBC } from 'react-big-calendar';
import styled from 'styled-components';
import { theme } from '@/themes';

const { Title, Text } = Typography;

export const Calendar = styled(CalendarRBC)`
    visibility: visible;

    & .rbc-timeslot-group {
        min-height: 70px;
    }

    & .rbc-event-label {
        font-size: 1rem;
    }

    & .rbc-event-label,
    & .rbc-allday-cell {
        display: none;
    }

    & .rbc-timeslot-group {
        border-bottom-color: ${theme.colors.borderSchedule};
    }
`;

export const ScheduleTitle = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
    }
`;

export const Event = styled.div``;

export const EventLabel = styled(Text)`
    &.ant-typography {
        font-size: 1.2rem;
        margin-bottom: 4px;
    }
`;

export const EventContent = styled.div`
    & .ant-typography {
        display: block;
        color: ${theme.colors.textSecondary};
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.625; /* 162.5% */
        letter-spacing: 0.083px;
    }
`;

export const StatusWrapper = styled(Space)`
    margin: 12px 0 48px 0;
`;

export const StatusItem = styled(Text)<{ $color: string }>`
    &.ant-typography {
        display: block;
        font-size: 1.4rem;
        font-weight: 600;
        margin-top: 10px;
        display: flex;
        align-items: center;

        &::before {
            content: '';
            display: inline-block;
            width: 60px;
            height: 30px;
            border-radius: 4px;
            background-color: ${(props) => props.$color};
            margin-right: 6px;
        }
    }
`;
