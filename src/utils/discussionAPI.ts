import { get, post, remove } from './apiCaller';

type CommentType = {
    serviceId: number;
    text: string;
};

type ReplyType = {
    commentId: number;
    text: string;
};

export const getCommentsByServiceId = (serviceId: number) => {
    return get(`/comment/services/${serviceId}`);
};

export const getRepliesCommentByCommentId = (commentId: number) => {
    return get(`/comment/${commentId}/reply`);
};

export const addComment = (comment: CommentType) => {
    return post(`/comment/add`, comment);
};

export const replyComment = (reply: ReplyType) => {
    return post(`/comment/reply/add`, reply);
};

export const deleteComment = (commentId: number) => {
    return remove(`/comment/remove/${commentId}`);
};

export const deleteReplyComment = (replyCommentId: number) => {
    return remove(`/comment/reply/remove/${replyCommentId}`);
};
