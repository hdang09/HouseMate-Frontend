import { useAppDispatch } from '@/hooks';
import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { scheduleSlice } from '../slice';

const InputNote = () => {
    const dispatch = useAppDispatch();

    const handleNoteChange = (value: any) => {
        dispatch(scheduleSlice.actions.setNote(value));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'note', value: value }));
    };

    return (
        <Form.Item label="Note" name="note" wrapperCol={{ offset: 0, span: 24 }}>
            <TextArea
                showCount
                maxLength={100}
                style={{ height: 120, marginBottom: 24 }}
                placeholder="Write your note"
                onChange={handleNoteChange}
            />
        </Form.Item>
    );
};

export default InputNote;
