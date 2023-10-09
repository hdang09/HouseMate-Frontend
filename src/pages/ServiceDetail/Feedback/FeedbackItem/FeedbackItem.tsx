import { Avatar, Rate, Typography } from 'antd';
import { FeedbackType } from '@/pages/ServiceDetail/Feedback/Feedback.type';
import { FeedbackItemInfo, FeedbackItemWrapper } from './FeedbackItem.styled';

const { Paragraph, Title, Text } = Typography;

const FeedbackItem = ({ feedback }: { feedback: FeedbackType }) => {
    return (
        <FeedbackItemWrapper>
            <Avatar src={feedback.avatar} alt={feedback.fullName} size={64} />

            <FeedbackItemInfo>
                <Title level={4}>{feedback.fullName}</Title>

                <Rate count={5} defaultValue={feedback.star} disabled />

                <Paragraph>{feedback.description}</Paragraph>

                <Text>{feedback.date}</Text>
            </FeedbackItemInfo>
        </FeedbackItemWrapper>
    );
};

export default FeedbackItem;
