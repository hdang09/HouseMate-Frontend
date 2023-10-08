import { Avatar, Popconfirm, Tooltip, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Comment } from '@ant-design/compatible';
import moment from 'moment';

import { CommentType, ReplyCommentType } from '@/pages/ServiceDetail/Discussion/Discussion.type';
import Editor from '@/pages/ServiceDetail/Discussion/Editor';
import { CommentWrapper } from './CommentItem.styled';

const { Text } = Typography;

const CommentItem = ({ comment }: { comment: CommentType }) => {
    // TODO: Handle call api later...
    const [comments, setComments] = useState<ReplyCommentType[]>(comment.listReplyComment);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [isReply, setIsReply] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');

    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Form confirm delete comment
    const text = 'Delete Comment?';
    const description = 'Are you sure you want to delete this comment?';

    useEffect(() => {
        if (!isReply || !inputRef.current) return;
        setValue(fullName);
        inputRef.current.focus();
    }, [isReply, fullName]);

    const handleSubmit = () => {
        if (!value) return;

        setSubmitting(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const handleReply = (fullName: string) => {
        setFullName('@' + fullName + ' ');
        setIsReply(true);

        if (!isReply || !inputRef.current) return;
        inputRef.current.focus();
    };

    const handleDelete = () => {
        console.log('Deleted!');
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
                <Popconfirm
                    placement="bottomLeft"
                    title={text}
                    description={description}
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Text key="comment-nested-delete">Delete</Text>
                </Popconfirm>,
            ]}
            author={comment.userDetail.fullName}
            avatar={comment.userDetail.avatar}
            content={comment.text}
            datetime={
                <Tooltip title={moment(comment.date).format('MMMM Do YYYY, h:mm A')}>
                    {moment(comment.date).startOf('second').fromNow()}
                </Tooltip>
            }
        >
            {comments.map((item) => (
                <CommentWrapper
                    key={item.replyId}
                    actions={[
                        <Text
                            key="comment-nested-reply-to"
                            onClick={() => handleReply(item.userDetail.fullName)}
                        >
                            Reply to
                        </Text>,
                        <Popconfirm
                            placement="bottomLeft"
                            title={text}
                            description={description}
                            onConfirm={handleDelete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Text key="comment-nested-delete">Delete</Text>
                        </Popconfirm>,
                    ]}
                    author={item.userDetail.fullName}
                    avatar={item.userDetail.avatar}
                    content={item.text}
                    datetime={
                        <Tooltip title={moment(item.date).format('MMMM Do YYYY, h:mm A')}>
                            {moment(item.date).startOf('second').fromNow()}
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
