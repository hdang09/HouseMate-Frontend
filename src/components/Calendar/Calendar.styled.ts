import styled, { css } from 'styled-components';

import { Calendar as CalendarRBC } from 'react-big-calendar';
import { Typography } from 'antd';
import { theme } from '@/themes';

const { Title, Text } = Typography;

export const PanelWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    svg {
        cursor: pointer;
    }
`;

export const StatusPanelText = styled(Text)`
    font-size: 2.4rem;
    font-weight: 500;
`;

export const CalendarWrapper = styled.div`
    ${({ theme }) => theme.breakpoints.down('lg')} {
        width: calc(100vw - 60px);
        overflow-x: scroll;
    }
`;

export const Calendar = styled(CalendarRBC)`
    width: 1170px;

    & .rbc-timeslot-group {
        min-height: 75px;
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

    /* Custom toolbar */
    & .rbc-btn-group {
        background-color: ${theme.colors.toolbarBg};
        padding: 4px;
        border-radius: 6px;

        & > button[type='button'] {
            box-shadow: none;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
        }

        & > .rbc-active {
            background-color: ${theme.colors.white};
        }

        ${({ theme }) => theme.breakpoints.down('sm')} {
            padding: 0;
        }
    }

    & .rbc-toolbar button:active:hover,
    & .rbc-toolbar button:active:focus,
    & .rbc-toolbar button.rbc-active:hover,
    & .rbc-toolbar button.rbc-active:focus,
    & .rbc-toolbar button:focus {
        background-color: ${theme.colors.white};
    }

    & .rbc-toolbar {
        position: sticky;
        left: 0px;

        ${({ theme }) => theme.breakpoints.down('xl')} {
            width: calc(100vw - 60px);
        }

        ${({ theme }) => theme.breakpoints.down('sm')} {
            flex-wrap: nowrap;
            justify-content: flex-start;
        }
    }

    & .rbc-toolbar-label {
        ${({ theme }) => theme.breakpoints.down('sm')} {
            font-size: 0;
        }

        ${({ theme }) => theme.breakpoints.down('xs')} {
            display: none;
        }
    }

    & .rbc-current-time-indicator {
        background-color: ${theme.colors.primary};
    }
`;

export const ScheduleTitle = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
        margin-bottom: 36px;

        ${({ theme }) => theme.breakpoints.down('sm')} {
            margin-bottom: 24px;
        }
    }
`;

export const Event = styled.div``;

export const EventLabel = styled(Text)<{ $isShort: boolean }>`
    &.ant-typography {
        font-size: 1.2rem;
        margin-bottom: 4px;
        line-height: 1.8rem;
        display: block;

        ${(props) =>
            props.$isShort &&
            css`
                display: -webkit-box;
                -webkit-line-clamp: var(--line-clamp, 1);
                -webkit-box-orient: vertical;
                overflow: hidden;
            `}
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

        display: -webkit-box;
        -webkit-line-clamp: var(--line-clamp, 1);
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    margin: 12px 0 48px 0;
    justify-content: space-between;
`;

export const StatusItem = styled(Text)<{ $color: string }>`
    &.ant-typography {
        display: flex;
        font-size: 1.4rem;
        font-weight: 600;
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

        ${({ theme }) => theme.breakpoints.between('md', 'lg')} {
            background-color: ${(props) => props.$color};
            padding: 6px 12px;
            border-radius: 6px;
            color: ${theme.colors.white};

            &::before {
                display: none;
            }
        }
    }
`;
