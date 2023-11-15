import { Button, List } from 'antd';

import { FeedbackListItem, ProgressBarType } from '@/pages/ServiceDetail/Feedback/Feedback.type';
import FeedbackItem from '@/pages/ServiceDetail/Feedback/FeedbackItem';
import { FeedbackFilterButton, FeedbackListWrapper } from './FeedbackList.styled';

const FeedbackList = ({
    feedbackList,
    progressBar,
    activeKey,
    onFilter,
}: {
    feedbackList: FeedbackListItem[];
    progressBar: ProgressBarType[];
    activeKey?: number;
    onFilter: any;
}) => {
    return (
        <>
            <FeedbackFilterButton>
                {progressBar.map((item) => (
                    <Button
                        key={item.id}
                        type={+item.id === activeKey ? 'primary' : 'default'}
                        onClick={() => onFilter(item)}
                    >
                        {item.label}
                    </Button>
                ))}
            </FeedbackFilterButton>

            <FeedbackListWrapper>
                <List
                    dataSource={feedbackList}
                    itemLayout="vertical"
                    pagination={{
                        position: 'bottom',
                        align: 'end',
                        pageSize: 3,
                        hideOnSinglePage: feedbackList.length <= 3,
                    }}
                    renderItem={(feedback) => (
                        <List.Item key={feedback.customerId}>
                            <FeedbackItem feedback={feedback} />
                        </List.Item>
                    )}
                />
            </FeedbackListWrapper>
        </>
    );
};

export default FeedbackList;
