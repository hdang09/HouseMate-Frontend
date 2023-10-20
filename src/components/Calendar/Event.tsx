import * as Styled from './Schedule.styled';

import EventType from './Schedule.types';
import { Typography } from 'antd';
import moment from 'moment';

const { Text } = Typography;

const Event = ({ event }: { event: EventType }) => {
    return (
        <Styled.Event>
            <Styled.EventLabel strong>{event.title}</Styled.EventLabel>

            <Styled.EventContent>
                <Text>Staff: {event.staff}</Text>

                <Text>
                    Time: {moment(event.start).format('h A')} -{moment(event.end).format('h A')}
                </Text>

                <Text>Phone: {event.phone}</Text>
            </Styled.EventContent>
        </Styled.Event>
    );
};

export default Event;
