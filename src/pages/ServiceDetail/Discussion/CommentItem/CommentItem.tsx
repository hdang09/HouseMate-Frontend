import { Avatar, Popconfirm, Tooltip, Typography, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Comment } from '@ant-design/compatible';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import config from '@/config';
import { useAppDispatch, useAuth } from '@/hooks';
import { CommentType, ReplyCommentType } from '@/pages/ServiceDetail/Discussion/Discussion.type';
import Editor from '@/pages/ServiceDetail/Discussion/Editor';
import { serviceSlice } from '@/pages/ServiceDetail/slice';
import {
    deleteReplyComment,
    getRepliesCommentByCommentId,
    replyComment,
} from '@/utils/discussionAPI';

import { CommentWrapper } from './CommentItem.styled';

const { Text } = Typography;

const CommentItem = ({
    comment,
    deleteComment,
}: {
    comment: CommentType;
    deleteComment: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
    const { role, user } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Show toast
    const [messageApi, contextHolder] = message.useMessage();

    // Handle recall api when submit or delete comment
    const [reload, setReload] = useState(0);

    // Reply List
    const [replyList, setReplyList] = useState<ReplyCommentType[]>(comment.listReplyComment);

    // State handle auto focus input when click 'reply to' button
    const [isReply, setIsReply] = useState<boolean>(false);

    // Show reply
    const [showReply, setShowReply] = useState<boolean>(false);

    const [submitting, setSubmitting] = useState<boolean>(false);

    // Form confirm delete comment
    const TEXT = 'Delete Comment?';
    const DESCRIPTION = 'Are you sure you want to delete this comment?';

    // Get list reply comment at the first time component mounted or dependency: comment.listReplyComment is changed
    useEffect(() => {
        setReplyList(comment.listReplyComment);
    }, [comment.listReplyComment]);

    // Get list reply comment when reply comment or delete comment
    useEffect(() => {
        if (reload === 0) return;

        (async () => {
            try {
                if (!comment.commentId) return;
                const { data } = await getRepliesCommentByCommentId(comment.commentId);
                setReplyList(data);
            } catch (error: any) {
                if (error.response) messageApi.error(error.response.data);
                else messageApi.error(error.message);
            }
        })();
    }, [reload]);

    const handleSubmitReplyComment = async (value: string) => {
        try {
            setSubmitting(true);

            const text = value.trim();

            if (!text || !comment.commentId) return;

            const reply = {
                commentId: +comment.commentId,
                text: text,
            };

            await replyComment(reply);

            setReload(reload + 1);
            dispatch(serviceSlice.actions.increaseCommentLength());
        } catch (error: any) {
            if (error.response) messageApi.error(error.response.data);
            else messageApi.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleShowAllReplies = () => setShowReply(!showReply);

    // Handle auto focus when click 'reply to' button
    const handleReply = () => {
        if (!role && !user) navigate(config.routes.public.login);

        setIsReply(true);
        setShowReply(true);
    };

    const handleDeleteReplyComment = async (replyCommentId: number) => {
        try {
            setSubmitting(true);

            if (!replyCommentId) return;
            const { data } = await deleteReplyComment(replyCommentId);

            messageApi.success(data);
            setReload(reload + 1);
            dispatch(serviceSlice.actions.decreaseCommentLength());
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
                    user?.userId === comment.userDetail.userId && (
                        <Popconfirm
                            placement="bottomLeft"
                            title={TEXT}
                            description={DESCRIPTION}
                            onConfirm={deleteComment}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Text key="comment-nested-delete">Delete</Text>
                        </Popconfirm>
                    ),
                    replyList.length > 0 && (
                        <Text key="comment-show-reply-list" onClick={handleShowAllReplies}>
                            {showReply
                                ? 'Close'
                                : replyList.length === 1
                                ? 'View 1 reply'
                                : `View all ${replyList.length} replies`}
                        </Text>
                    ),
                ]}
                author={comment.userDetail.fullName}
                avatar={
                    comment.userDetail.avatar ? (
                        <Avatar
                            size={32}
                            src={comment.userDetail.avatar}
                            alt={comment.userDetail.fullName}
                        />
                    ) : (
                        <Avatar
                            size={32}
                            icon={<UserOutlined />}
                            alt={comment.userDetail.fullName}
                        />
                    )
                }
                content={comment.text}
                datetime={
                    <Tooltip title={moment(comment.date).format('MMMM Do YYYY, h:mm A')}>
                        {moment(comment.date).startOf('second').fromNow()}
                    </Tooltip>
                }
            >
                {showReply &&
                    replyList.map((item) => (
                        <CommentWrapper
                            key={item.replyId}
                            actions={[
                                <Text key="comment-nested-reply-to" onClick={handleReply}>
                                    Reply to
                                </Text>,
                                <Popconfirm
                                    placement="bottomLeft"
                                    title={TEXT}
                                    description={DESCRIPTION}
                                    onConfirm={() => handleDeleteReplyComment(item.replyId)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    {user?.userId === item.userDetail.userId && (
                                        <Text key="comment-nested-delete">Delete</Text>
                                    )}
                                </Popconfirm>,
                            ]}
                            author={item.userDetail.fullName}
                            avatar={
                                (
                                    <Avatar
                                        size={32}
                                        src={item.userDetail.avatar}
                                        alt={item.userDetail.fullName}
                                    />
                                ) || (
                                    <Avatar
                                        size={32}
                                        icon={<UserOutlined />}
                                        alt={item.userDetail.fullName}
                                    />
                                )
                            }
                            content={item.text}
                            datetime={
                                <Tooltip title={moment(item.date).format('MMMM Do YYYY, h:mm A')}>
                                    {moment(item.date).startOf('second').fromNow()}
                                </Tooltip>
                            }
                        />
                    ))}

                {isReply && showReply && (
                    <Comment
                        avatar={
                            <Avatar size={32} src={user?.avatar} alt={user?.fullName} /> || (
                                <Avatar size={32} icon={<UserOutlined />} alt={user?.fullName} />
                            )
                        }
                        content={
                            <Editor
                                onSubmit={handleSubmitReplyComment}
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
