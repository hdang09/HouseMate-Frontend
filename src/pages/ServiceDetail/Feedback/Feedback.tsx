import { Progress, Rate, Space, Typography } from 'antd';
import { useState, useEffect } from 'react';

import * as St from './Feedback.styled';
import { feedbackDummy } from './Feedback.dummy';
import FeedbackList from './FeedbackList';
import { FeedbackType } from './Feedback.type';

const { Title, Text } = Typography;

export const progressBar = [
    {
        id: 1,
        label: '5 star',
        star: 5,
        quantity: feedbackDummy.filter((feedback) => feedback.star === 5),
    },
    {
        id: 2,
        label: '4 star',
        star: 4,
        quantity: feedbackDummy.filter((feedback) => feedback.star === 4),
    },
    {
        id: 3,
        label: '3 star',
        star: 3,
        quantity: feedbackDummy.filter((feedback) => feedback.star === 3),
    },
    {
        id: 4,
        label: '2 star',
        star: 2,
        quantity: feedbackDummy.filter((feedback) => feedback.star === 2),
    },
    {
        id: 5,
        label: '1 star',
        star: 1,
        quantity: feedbackDummy.filter((feedback) => feedback.star === 1),
    },
];

const totalStar = progressBar.reduce((acc, cur) => acc + cur.quantity.length, 0);

const Feedback = () => {
    const [feedbackList, setFeedbackList] = useState<FeedbackType[]>([]);

    // Handle add type primary if button clicked
    const [buttonTypeId, setButtonTypeId] = useState<number>(1);

    useEffect(() => {
        setFeedbackList([...feedbackDummy.filter((feedback) => feedback.star === 5)]);
    }, []);

    // TODO: Any will be handled later...
    const handleFilterRating = (item: any) => {
        setButtonTypeId(item.id);
        setFeedbackList([...feedbackDummy.filter((feedback) => feedback.star === item.star)]);
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
                                <Space>
                                    <Text>{item.star}</Text>
                                    <Rate count={1} defaultValue={1} disabled />
                                </Space>
                                <Progress
                                    format={() => item.quantity.length}
                                    percent={(item.quantity.length / totalStar) * 100}
                                />
                            </St.FeedbackProgressItem>
                        ))}
                    </St.FeedbackProgressBar>
                </St.FeedbackReview>

                <FeedbackList
                    feedbackList={feedbackList}
                    activeKey={buttonTypeId}
                    onFilter={handleFilterRating}
                />
            </St.FeedbackWrapper>
        </>
    );
};

export default Feedback;
