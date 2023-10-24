import { Avatar, Rate, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { FeedbackListItem } from '@/pages/ServiceDetail/Feedback/Feedback.type';

import { FeedbackItemInfo, FeedbackItemWrapper } from './FeedbackItem.styled';

const { Paragraph, Title, Text } = Typography;

const FeedbackItem = ({ feedback }: { feedback: FeedbackListItem }) => {
    return (
        <FeedbackItemWrapper>
            <Avatar size={64} icon={<UserOutlined />} alt={feedback.customerName} />

            <FeedbackItemInfo>
                <Title level={4}>{feedback.customerName}</Title>

                <Rate count={5} defaultValue={feedback.rating} disabled />

                <Paragraph>{feedback.content}</Paragraph>

                <Text>{dayjs(feedback.createdAt).format('DD/MM/YYYY')}</Text>
            </FeedbackItemInfo>
        </FeedbackItemWrapper>
    );
};

export default FeedbackItem;
