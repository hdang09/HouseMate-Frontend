import { Avatar, Popconfirm, Tooltip, Typography, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Comment } from '@ant-design/compatible';
import moment from 'moment';

import { CommentType, ReplyCommentType } from '@/pages/ServiceDetail/Discussion/Discussion.type';
import Editor from '@/pages/ServiceDetail/Discussion/Editor';
import { deleteReplyComment, replyComment } from '@/utils/discussionAPI';

import { CommentWrapper } from './DiscussionItem.styled';

const { Text } = Typography;

const CommentItem = ({
    comment,
    reply,
    deleteComment,
}: {
    comment: CommentType;
    reply: ReplyCommentType[];
    deleteComment: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
    const [messageApi, contextHolder] = message.useMessage();

    const [comments, setComments] = useState<ReplyCommentType[]>([]);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [isReply, setIsReply] = useState<boolean>(false);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Form confirm delete comment
    const text = 'Delete Comment?';
    const description = 'Are you sure you want to delete this comment?';

    useEffect(() => {
        if (!isReply || !inputRef.current) return;
        inputRef.current.focus();
    }, [isReply]);

    useEffect(() => {
        setComments(reply);
    }, [reply]);

    const handleSubmit = async (value: string) => {
        try {
            setSubmitting(true);

            const text = value.trim();

            if (!text || !comment.commentId) return;

            const reply = {
                commentId: +comment.commentId,
                text: text,
            };
            await replyComment(reply);
        } catch (error: any) {
            if (error.response) messageApi.error(error.response.data);
            else messageApi.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleReply = () => {
        setIsReply(true);

        if (!isReply || !inputRef.current) return;
        inputRef.current.focus();
    };

    const handleDeleteReplyComment = async (replyCommentId: number) => {
        try {
            setSubmitting(true);

            if (!replyCommentId) return;
            const { data } = await deleteReplyComment(replyCommentId);
            if (data) messageApi.success(data);
        } catch (error: any) {
            if (error.response) messageApi.error(error.response.data);
            else messageApi.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {contextHolder}
            <CommentWrapper
                actions={[
                    <Text key="comment-nested-reply-to" onClick={handleReply}>
                        Reply to
                    </Text>,
                    <Popconfirm
                        placement="bottomLeft"
                        title={text}
                        description={description}
                        onConfirm={deleteComment}
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
                            <Text key="comment-nested-reply-to" onClick={handleReply}>
                                Reply to
                            </Text>,
                            <Popconfirm
                                placement="bottomLeft"
                                title={text}
                                description={description}
                                onConfirm={() => handleDeleteReplyComment(item.replyId)}
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
                                onSubmit={handleSubmit}
                                submitting={submitting}
                                placeholder="Write a reply..."
                                autoSize={{ minRows: 2 }}
                            />
                        }
                    />
                )}
            </CommentWrapper>
        </>
    );
};

export default CommentItem;
