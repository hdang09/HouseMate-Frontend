import { Form } from 'antd';
import { TextAreaRef } from 'antd/es/input/TextArea';
import { forwardRef } from 'react';
import { EditorProps } from '@/pages/ServiceDetail/Discussion/Discussion.type';
import { CommentInput, CommentButton } from './Editor.styled';

const Editor = (props: EditorProps, ref: React.Ref<TextAreaRef>) => {
    const { onChange, onSubmit, submitting, value, ...rest } = props;

    return (
        <>
            <Form.Item>
                <CommentInput
                    ref={ref}
                    rows={4}
                    onChange={onChange}
                    value={value}
                    maxLength={100}
                    showCount
                    {...rest}
                />
            </Form.Item>
            <Form.Item>
                <CommentButton
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    type="primary"
                >
                    Add Comment
                </CommentButton>
            </Form.Item>
        </>
    );
};

export default forwardRef(Editor);
