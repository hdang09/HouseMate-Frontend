import { Progress, Rate, Skeleton, Space, Typography } from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getFeedbackFilter, getFeedbackOverview } from '@/utils/feedbackAPI';

import FeedbackList from './FeedbackList';
import { FeedbackOverview, FeedbackType, ProgressBarType } from './Feedback.type';
import * as St from './Feedback.styled';
import { Rating } from '@/utils/enums';

const { Title, Text } = Typography;

const Feedback = () => {
    const { serviceId } = useParams();

    const [feedback, setFeedback] = useState<FeedbackType>();
    const [overview, setOverview] = useState<FeedbackOverview>();
    const [reload, setReload] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    // Handle add type primary if button clicked
    const [buttonTypeId, setButtonTypeId] = useState<number>(5);

    useEffect(() => {
        (async () => {
            try {
                if (!serviceId) return;

                const { data: FbOverview }: { data: FeedbackOverview } = await getFeedbackOverview(
                    +serviceId,
                );

                const { data: FbList }: { data: FeedbackType } = await getFeedbackFilter(
                    +serviceId,
                    { rating: buttonTypeId },
                );

                setOverview(FbOverview);
                setFeedback(FbList);
            } catch (error: any) {
                setFeedback({} as FeedbackType);
            } finally {
                setLoading(false);
            }
        })();
    }, [reload]);

    const handleFilterRating = (item: ProgressBarType) => {
        setButtonTypeId(item.id);
        setReload(reload + 1);
    };

    const progressBar: ProgressBarType[] = [
        {
            id: Rating.FIVE,
            label: `${Rating.FIVE} sao`,
            star: Rating.FIVE,
            quantity: overview?.numOfReviewPerRatingLevel[Rating.FIVE] || 0,
        },
        {
            id: Rating.FOUR,
            label: `${Rating.FOUR} sao`,
            star: Rating.FOUR,
            quantity: overview?.numOfReviewPerRatingLevel[Rating.FOUR] || 0,
        },
        {
            id: Rating.THREE,
            label: `${Rating.THREE} sao`,
            star: Rating.THREE,
            quantity: overview?.numOfReviewPerRatingLevel[Rating.THREE] || 0,
        },
        {
            id: Rating.TWO,
            label: `${Rating.TWO} sao`,
            star: Rating.TWO,
            quantity: overview?.numOfReviewPerRatingLevel[Rating.TWO] || 0,
        },
        {
            id: Rating.ONE,
            label: `${Rating.ONE} sao`,
            star: Rating.ONE,
            quantity: overview?.numOfReviewPerRatingLevel[Rating.ONE] || 0,
        },
    ];
    const totalStar = progressBar.reduce((acc, cur) => acc + cur.quantity, 0);

    return (
        <>
            <St.FeedbackWrapper>
                <Title level={2}>Xếp Hạng & Đánh Giá</Title>

                <Skeleton loading={loading}>
                    <St.FeedbackReview>
                        <St.FeedbackContent>
                            <Title level={3}>{overview?.avgRating.toFixed(1) || 0}/5</Title>
                            <Rate allowHalf count={5} value={overview?.avgRating} disabled />
                            <Text>{overview?.numOfReview || 0} đánh giá</Text>
                        </St.FeedbackContent>

                        <St.FeedbackProgressBar>
                            {progressBar.map((item) => (
                                <St.FeedbackProgressItem key={item.id}>
                                    <Space>
                                        <Text>{item.star}</Text>
                                        <Rate count={1} defaultValue={1} disabled />
                                    </Space>
                                    <Progress
                                        format={() => item.quantity}
                                        percent={(item.quantity / totalStar) * 100}
                                    />
                                </St.FeedbackProgressItem>
                            ))}
                        </St.FeedbackProgressBar>
                    </St.FeedbackReview>
                </Skeleton>

                <FeedbackList
                    feedbackList={feedback?.feedbackList || []}
                    progressBar={progressBar}
                    activeKey={buttonTypeId}
                    onFilter={handleFilterRating}
                />
            </St.FeedbackWrapper>
        </>
    );
};

export default Feedback;
