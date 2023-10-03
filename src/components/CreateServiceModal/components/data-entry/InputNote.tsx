import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const InputNote = () => {
    return (
        <Form.Item label="Note" name="note">
            <TextArea
                showCount
                maxLength={100}
                style={{ height: 120, marginBottom: 24 }}
                placeholder="Write your note"
            />
        </Form.Item>
    );
};

export default InputNote;
