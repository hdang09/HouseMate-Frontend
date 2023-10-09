import { Avatar, List, Skeleton, Typography, message } from 'antd';
import { Comment } from '@ant-design/compatible';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { addComment, deleteComment, getCommentsByServiceId } from '@/utils/discussionAPI';

import Editor from './Editor';
import { CommentType } from './Discussion.type';
import CommentItem from './DiscussionItem';
import * as St from './Discussion.styled';

const { Title } = Typography;

const Discussion = () => {
    const { serviceId } = useParams();
    const [messageApi, contextHolder] = message.useMessage();

    const [reload, setReload] = useState(0);

    // Get all comments by service id
    const [comments, setComments] = useState<CommentType[]>();

    // Skeleton
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                if (!serviceId) return;
                const { data } = await getCommentsByServiceId(+serviceId);
                setComments(data);
            } catch (error: any) {
                if (error.response) messageApi.error(error.response.data);
                else messageApi.error(error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [reload]);

    const handleSubmit = async (value: string) => {
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
            if (data) messageApi.success(data);

            setReload(reload + 1);
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
                    {comments && comments.length > 0 && (
                        <List
                            dataSource={comments}
                            itemLayout="horizontal"
                            renderItem={(comment) => (
                                <CommentItem
                                    comment={comment}
                                    reply={comment.listReplyComment}
                                    deleteComment={() => handleDeleteComment(comment.commentId)}
                                />
                            )}
                        />
                    )}

                    <Comment
                        avatar={
                            <Avatar
                                src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/299078245_1428951540939042_6320725405900901943_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=zx_e3v5YX-8AX9_rK-i&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfDwfxNrDcK9Np3f7uORBbLOv_gtUK4dmZGjAs1GE6pAbw&oe=65282501"
                                alt="Han Solo"
                            />
                        }
                        content={
                            <Editor
                                onSubmit={handleSubmit}
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
