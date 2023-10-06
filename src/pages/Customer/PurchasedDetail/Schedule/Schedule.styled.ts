import { Calendar as CalendarRBC } from 'react-big-calendar';
import styled from 'styled-components';
import { theme } from '@/themes';

export const Calendar = styled(CalendarRBC)`
    visibility: visible;
`;

export const Event = styled.div`
    & .ant-typography {
        display: block;
        color: ${theme.colors.textSecondary};
        font-size: 0.8rem;
        font-weight: 400;
        line-height: 1.625; /* 162.5% */
        letter-spacing: 0.083px;
    }
`;
