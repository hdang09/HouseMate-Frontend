import * as Styled from './Calendar.styled';

import EventType from './Calendar.types';
import { Role } from '@/utils/enums';
import { Typography } from 'antd';
import moment from 'moment';
import { useAuth } from '@/hooks';

const { Text } = Typography;

const Event = ({ event }: { event: EventType }) => {
    const startDate = moment(event.start);
    const endDate = moment(event.end);
    const isShort = endDate.diff(startDate, 'hours') <= 1;

    // TODO: Optimize performance
    const { role } = useAuth();

    return (
        <Styled.Event>
            <Styled.EventLabel strong $isShort={isShort}>
                {event.title}
            </Styled.EventLabel>

            <Styled.EventContent>
                <Text>
                    {role === Role.CUSTOMER ? 'Nh.viên' : 'K.hàng'}: {event.userName || 'Chưa có'}
                </Text>

                <Text>
                    Thời gian: {startDate.format('HH:mm')} - {endDate.format('HH:mm')}
                </Text>

                <Text>SĐT: {event.phone || 'Chưa có'}</Text>
            </Styled.EventContent>
        </Styled.Event>
    );
};

export default Event;
