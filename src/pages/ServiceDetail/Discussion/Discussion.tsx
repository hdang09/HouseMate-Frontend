import { Avatar, Typography } from 'antd';
import { Comment } from '@ant-design/compatible';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Editor from './Editor';
import discussionDummy from './Discussion.dummy';
import { CommentType } from './Discussion.type';
import CommentList from './CommentList';
import * as St from './Discussion.styled';

const { Title } = Typography;

const Discussion = () => {
    const { serviceId } = useParams();
    const [comments, setComments] = useState<CommentType[]>();
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    useEffect(() => {
        (async () => {
            if (!serviceId) return;
            setComments(discussionDummy);
        })();
    }, [comments]);

    const handleSubmit = () => {
        if (!value) return;

        setSubmitting(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    return (
        <St.DiscussionWrapper>
            <Title level={2}>Discussion</Title>

            {comments && comments.length > 0 && <CommentList comments={comments} />}

            <Comment
                avatar={
                    <Avatar
                        src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/299078245_1428951540939042_6320725405900901943_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=zx_e3v5YX-8AX9_rK-i&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfDwfxNrDcK9Np3f7uORBbLOv_gtUK4dmZGjAs1GE6pAbw&oe=65282501"
                        alt="Han Solo"
                    />
                }
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                        placeholder="Write a comment..."
                        autoSize={{ minRows: 3 }}
                    />
                }
            />
        </St.DiscussionWrapper>
    );
};

export default Discussion;
