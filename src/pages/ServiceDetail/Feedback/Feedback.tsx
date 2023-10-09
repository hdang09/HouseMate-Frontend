import { Progress, Rate, Typography } from 'antd';
import { useState } from 'react';

import * as St from './Feedback.styled';
import { feedbackDummy } from './Feedback.dummy';
import FeedbackList from './FeedbackList';

const { Title, Text } = Typography;

export const progressBar = [
    {
        id: 1,
        label: 5,
        quantity: feedbackDummy.filter((feedback) => feedback.star === 5),
    },
    {
        id: 2,
        label: 4,
        quantity: feedbackDummy.filter((feedback) => feedback.star === 4),
    },
    {
        id: 3,
        label: 3,
        quantity: feedbackDummy.filter((feedback) => feedback.star === 3),
    },
    {
        id: 4,
        label: 2,
        quantity: feedbackDummy.filter((feedback) => feedback.star === 2),
    },
    {
        id: 5,
        label: 1,
        quantity: feedbackDummy.filter((feedback) => feedback.star === 1),
    },
];

const totalStar = progressBar.reduce((acc, cur) => acc + cur.quantity.length, 0);

const Feedback = () => {
    // Handle add type primary if button clicked
    const [buttonTypeId, setButtonTypeId] = useState<number>();

    // TODO: Any will be handled later...
    const handleFilterRating = (item: any) => {
        setButtonTypeId(item.id);
        console.log(item.id);
    };

    return (
        <>
            <St.FeedbackWrapper>
                <Title level={2}>Rating & Review</Title>

                <St.FeedbackReview>
                    <St.FeedbackContent>
                        <Title level={3}>4.8/5</Title>
                        <Rate allowHalf count={5} defaultValue={4.8} disabled />
                        <Text>300 reviews</Text>
                    </St.FeedbackContent>

                    <St.FeedbackProgressBar>
                        {progressBar.map((item) => (
                            <St.FeedbackProgressItem key={item.id}>
                                <Text>{item.label}</Text>
                                <Rate count={1} defaultValue={1} disabled />
                                <Progress
                                    format={(percent) => percent}
                                    percent={(item.quantity.length / totalStar) * 100}
                                    size={[341, 8]}
                                />
                            </St.FeedbackProgressItem>
                        ))}
                    </St.FeedbackProgressBar>
                </St.FeedbackReview>

                <FeedbackList
                    feedbackList={feedbackDummy}
                    activeKey={buttonTypeId}
                    onFilter={handleFilterRating}
                />
            </St.FeedbackWrapper>
        </>
    );
};

export default Feedback;
