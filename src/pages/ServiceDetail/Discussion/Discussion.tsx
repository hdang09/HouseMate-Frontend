import { Avatar, Skeleton, Typography, message } from 'antd';
import { Comment } from '@ant-design/compatible';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { addComment, deleteComment, getCommentsByServiceId } from '@/utils/discussionAPI';

import Editor from './Editor';
import { CommentType } from './Discussion.type';
import CommentList from './CommentList';

import * as St from './Discussion.styled';

const { Title } = Typography;

const Discussion = () => {
    // Get serviceId on URL
    const { serviceId } = useParams();

    // Show toast
    const [messageApi, contextHolder] = message.useMessage();

    // Handle recall api when submit or delete comment
    const [reload, setReload] = useState(0);

    // Comment List
    const [commentList, setCommentList] = useState<CommentType[]>();

    // Skeleton
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState(false);

    // Call api to get comment list
    useEffect(() => {
        (async () => {
            try {
                if (!serviceId) return;
                const { data } = await getCommentsByServiceId(+serviceId);
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

    const handleDeleteComment = useCallback(async (commentId: number) => {
        try {
            setSubmitting(true);

            if (!commentId) return;
            const { data } = await deleteComment(commentId);
            if (data) messageApi.success(data);

            setReload((prevReload) => prevReload + 1);
        } catch (error: any) {
            if (error.response) messageApi.error(error.response.data);
            else messageApi.error(error.message);
        } finally {
            setSubmitting(false);
        }
    }, []);

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
                            <Avatar
                                src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/299078245_1428951540939042_6320725405900901943_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=zx_e3v5YX-8AX9_rK-i&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfDwfxNrDcK9Np3f7uORBbLOv_gtUK4dmZGjAs1GE6pAbw&oe=65282501"
                                alt="Han Solo"
                            />
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
