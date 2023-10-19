import { Avatar, Skeleton, Typography, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Comment } from '@ant-design/compatible';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import config from '@/config';
import { useAppDispatch, useAppSelector, useAuth } from '@/hooks';
import { serviceSlice } from '@/pages/ServiceDetail/slice';
import { addComment, deleteComment, getCommentsByServiceId } from '@/utils/discussionAPI';

import Editor from './Editor';
import { CommentType } from './Discussion.type';
import CommentList from './CommentList';

import * as St from './Discussion.styled';

const { Title } = Typography;

const Discussion = () => {
    const { role, user } = useAuth();
    const navigate = useNavigate();
    const commentLength = useAppSelector((state) => state.service.commentLength);
    const dispatch = useAppDispatch();

    // Get serviceId on URL
    const { serviceId } = useParams();

    // Show toast
    const [messageApi, contextHolder] = message.useMessage();

    // Handle recall api when submit or delete comment
    const [reload, setReload] = useState(0);

    // Comment List
    const [commentList, setCommentList] = useState<CommentType[]>([]);

    // Skeleton
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState(false);

    // Call api to get comment list
    useEffect(() => {
        (async () => {
            try {
                if (!serviceId) return;
                const { data }: { data: CommentType[] } = await getCommentsByServiceId(+serviceId);
                setCommentList(data);
            } catch (error: any) {
                if (error.response) messageApi.error(error.response.data);
                else messageApi.error(error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [reload]);

    const handleSubmitComment = async (value: string) => {
        if (!role && !user) {
            navigate(config.routes.public.login);
            return;
        }

        try {
            setSubmitting(true);

            const text = value.trim();
            if (!text || !serviceId) return;
            const comment = {
                serviceId: +serviceId,
                text: text,
            };

            await addComment(comment);

            setReload(reload + 1);
            dispatch(serviceSlice.actions.increaseCommentLength());
        } catch (error: any) {
            if (error.response) messageApi.error(error.response.data);
            else messageApi.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        try {
            setSubmitting(true);

            if (!commentId) return;
            const { data } = await deleteComment(commentId);

            messageApi.success(data);
            setReload((prevReload) => prevReload + 1);
            dispatch(
                serviceSlice.actions.setCommentLength(
                    commentLength -
                        ((commentList.find((item) => item.commentId === commentId)?.listReplyComment
                            ?.length ?? 0) +
                            1),
                ),
            );
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
            <St.DiscussionWrapper>
                <Title level={2}>Discussion</Title>

                <Skeleton loading={loading}>
                    {commentList && commentList.length > 0 && (
                        <CommentList
                            commentList={commentList}
                            deleteComment={handleDeleteComment}
                        />
                    )}

                    <Comment
                        avatar={
                            (user && user.avatar) || <Avatar size={32} icon={<UserOutlined />} />
                        }
                        content={
                            <Editor
                                onSubmit={handleSubmitComment}
                                submitting={submitting}
                                placeholder="Write a comment..."
                                autoSize={{ minRows: 3 }}
                            />
                        }
                    />
                </Skeleton>
            </St.DiscussionWrapper>
        </>
    );
};

export default Discussion;
