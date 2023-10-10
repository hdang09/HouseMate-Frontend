import { List } from 'antd';
import { memo } from 'react';
import { CommentType } from '@/pages/ServiceDetail/Discussion/Discussion.type';
import CommentItem from '@/pages/ServiceDetail/Discussion/CommentItem';

const CommentList = ({
    commentList,
    deleteComment,
}: {
    commentList: CommentType[];
    deleteComment: (value: number) => void;
}) => {
    return (
        <List
            dataSource={commentList}
            pagination={{
                position: 'bottom',
                align: 'end',
                pageSize: 3,
                hideOnSinglePage: commentList.length <= 3,
            }}
            itemLayout="horizontal"
            renderItem={(comment) => (
                <CommentItem
                    comment={comment}
                    deleteComment={() => deleteComment(comment.commentId)}
                />
            )}
        />
    );
};

export default memo(CommentList);
