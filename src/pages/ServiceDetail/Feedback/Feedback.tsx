import { Typography } from 'antd';

import * as St from './Feedback.styled';

const { Title } = Typography;

const Feedback = () => {
    return (
        <St.FeedbackWrapper>
            <Title level={2}>Rating & Review</Title>
        </St.FeedbackWrapper>
    );
};

export default Feedback;
