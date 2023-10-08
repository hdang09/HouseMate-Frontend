import { List } from 'antd';
import CommentItem from '@/pages/ServiceDetail/Discussion/CommentItem';
import { CommentType } from '@/pages/ServiceDetail/Discussion/Discussion.type';

const CommentList = ({ comments }: { comments: CommentType[] }) => (
    <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={(comment) => <CommentItem comment={comment} />}
    />
);

export default CommentList;
