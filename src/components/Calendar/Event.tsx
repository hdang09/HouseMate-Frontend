import * as Styled from './Calendar.styled';

import EventType from './Calendar.types';
import { Typography } from 'antd';
import moment from 'moment';

const { Text } = Typography;

const Event = ({ event }: { event: EventType }) => {
    const startDate = moment(event.start);
    const endDate = moment(event.end);
    const isShort = endDate.diff(startDate, 'hours') <= 1;

    return (
        <Styled.Event>
            <Styled.EventLabel strong $isShort={isShort}>
                {event.title}
            </Styled.EventLabel>

            <Styled.EventContent>
                <Text>Staff: {event.staff}</Text>

                <Text>
                    Time: {startDate.format('HH:mm')} - {endDate.format('HH:mm')}
                </Text>

                <Text>Phone: {event.phone}</Text>
            </Styled.EventContent>
        </Styled.Event>
    );
};

export default Event;
