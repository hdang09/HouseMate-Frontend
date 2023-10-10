import * as Styled from './Schedule.styled';

import { Typography } from 'antd';
import moment from 'moment';
import { Event } from '@/pages/Customer/PurchasedDetail/PurchasedDetail.types';

const { Text } = Typography;

const Event = ({ event }: { event: Event }) => {
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
