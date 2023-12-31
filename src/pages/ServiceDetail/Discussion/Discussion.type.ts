interface AutoSizeType {
    minRows?: number;
    maxRows?: number;
}

export interface EditorProps {
    onSubmit: (value: string) => Promise<void>;
    submitting: boolean;
    placeholder?: string;
    autoSize?: AutoSizeType;
}

type UserDetailType = {
    userId: number;
    fullName: string;
    avatar: string;
};

export type ReplyCommentType = {
    replyId: number;
    commentId: number;
    userId: number;
    text: string;
    date: string;
    userDetail: UserDetailType;
};

export type CommentType = {
    commentId: number;
    serviceId: number;
    userId: number;
    text: string;
    date: string;
    listReplyComment: ReplyCommentType[];
    userDetail: UserDetailType;
};
