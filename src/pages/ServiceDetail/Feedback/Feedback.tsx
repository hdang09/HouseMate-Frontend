import { Rate, Typography } from 'antd';

import * as St from './Feedback.styled';

const { Title } = Typography;

const Feedback = () => {
    return (
        <St.FeedbackWrapper>
            <Title level={2}>Rating & Review</Title>

            <St.FeedbackReview>
                <St.FeedbackContent>
                    <Title level={3}>4.8/5</Title>
                    <Rate allowHalf></Rate>
                </St.FeedbackContent>

                <St.FeedbackProgressBar></St.FeedbackProgressBar>
            </St.FeedbackReview>
        </St.FeedbackWrapper>
    );
};

export default Feedback;
