import { Avatar, Tooltip, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Comment } from '@ant-design/compatible';

import { CommentType } from '@/pages/ServiceDetail/Discussion/Discussion.type';
import Editor from '@/pages/ServiceDetail/Discussion/Editor';
import timeAgo from '@/utils/timeAgo';
import { CommentWrapper } from './CommentItem.styled';

const { Text } = Typography;

const CommentItem = ({ comment }: { comment: CommentType }) => {
    const [submitting, setSubmitting] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState('');
    const [isReply, setIsReply] = useState(false);

    useEffect(() => {
        if (!isReply || !inputRef.current) return;
        inputRef.current.focus();
    }, [isReply]);

    const handleSubmit = () => {
        if (!value) return;

        setSubmitting(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const handleReply = (fullName: string) => {
        console.log(fullName);
        setIsReply(true);

        if (!isReply || !inputRef.current) return;
        inputRef.current.focus();
    };

    return (
        <CommentWrapper
            actions={[
                <Text
                    key="comment-nested-reply-to"
                    onClick={() => handleReply(comment.userDetail.fullName)}
                >
                    Reply to
                </Text>,
                <Text key="comment-nested-delete">Delete</Text>,
            ]}
            author={comment.userDetail.fullName}
            avatar={comment.userDetail.avatar}
            content={comment.text}
            datetime={
                <Tooltip title={new Date(comment.date).toLocaleString()}>
                    {timeAgo(new Date(comment.date))}
                </Tooltip>
            }
        >
            {comment.listReplyComment.map((item) => (
                <CommentWrapper
                    key={item.replyId}
                    actions={[
                        <Text
                            key="comment-nested-reply-to"
                            onClick={() => handleReply(item.userDetail.fullName)}
                        >
                            Reply to
                        </Text>,
                        <Text key="comment-nested-delete">Delete</Text>,
                    ]}
                    author={item.userDetail.fullName}
                    avatar={item.userDetail.avatar}
                    content={item.text}
                    datetime={
                        <Tooltip title={new Date(item.date).toLocaleString()}>
                            {timeAgo(new Date(item.date))}
                        </Tooltip>
                    }
                />
            ))}

            {isReply && (
                <Comment
                    avatar={
                        <Avatar
                            src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/299078245_1428951540939042_6320725405900901943_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=zx_e3v5YX-8AX9_rK-i&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfDwfxNrDcK9Np3f7uORBbLOv_gtUK4dmZGjAs1GE6pAbw&oe=65282501"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            ref={inputRef}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                            placeholder="Write a reply..."
                            autoSize={{ minRows: 2 }}
                        />
                    }
                />
            )}
        </CommentWrapper>
    );
};

export default CommentItem;
