import * as Styled from './Schedule.styled';

import { Typography } from 'antd';

const { Text } = Typography;

// TODO: Change type of event
const Event = ({ event }: { event: any }) => {
    return (
        <Styled.Event>
            <Text>Staff: Duong Hoang Nam</Text>
            <Text>Service: {event.title}</Text>
            <Text>Phone: 0866 123 456</Text>
        </Styled.Event>
    );
};

export default Event;
