import { Comment } from '@ant-design/compatible';
import styled from 'styled-components';
import { theme } from '@/themes';

export const CommentWrapper = styled(Comment)`
    & .ant-comment-inner {
        padding: 20px 0;

        & li:last-child .ant-typography {
            color: ${theme.colors.primary};
        }
    }

    & .ant-comment-actions .ant-typography,
    & .ant-comment-content-author .ant-comment-content-author-name,
    & .ant-comment-content-author .ant-comment-content-author-time {
        font-size: 1.4rem;
    }

    & .ant-comment-content-author .ant-comment-content-author-name {
        color: ${theme.colors.textSecondary};
    }

    & .ant-comment-content-author .ant-comment-content-author-time {
        color: ${theme.colors.disabledPlaceholder};
    }

    & .ant-comment-content-detail {
        font-size: 1.6rem;
    }
`;
