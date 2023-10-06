import 'react-big-calendar/lib/css/react-big-calendar.css';

import * as Styled from './Schedule.styled';

import events, { eventStyleGetter } from './Schedule.events';

import Event from './Event';
import { Typography } from 'antd';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment);

const { Title } = Typography;

const Schedule = () => {
    return (
        <>
            <Title level={3}>Your week schdule</Title>
            <Styled.Calendar
                localizer={localizer}
                events={events}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: Event,
                }}
                min={new Date(0, 0, 0, 6, 0, 0)}
                max={new Date(0, 0, 0, 21, 0, 0)}
            />
        </>
    );
};

export default Schedule;
