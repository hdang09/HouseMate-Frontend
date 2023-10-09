import { Form } from 'antd';
import { TextAreaRef } from 'antd/es/input/TextArea';
import { forwardRef, useState } from 'react';
import { EditorProps } from '@/pages/ServiceDetail/Discussion/Discussion.type';
import { CommentInput, CommentButton } from './Editor.styled';

const Editor = (props: EditorProps, ref: React.Ref<TextAreaRef>) => {
    const [value, setValue] = useState('');
    const { onSubmit, submitting, ...rest } = props;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(value);
        setValue('');
    };

    return (
        <>
            <Form.Item>
                <CommentInput
                    ref={ref}
                    rows={4}
                    onChange={handleChange}
                    value={value}
                    maxLength={500}
                    showCount
                    {...rest}
                />
            </Form.Item>
            <Form.Item>
                <CommentButton
                    htmlType="submit"
                    loading={submitting}
                    onClick={handleSubmit}
                    type="primary"
                >
                    Add Comment
                </CommentButton>
            </Form.Item>
        </>
    );
};

export default forwardRef(Editor);
