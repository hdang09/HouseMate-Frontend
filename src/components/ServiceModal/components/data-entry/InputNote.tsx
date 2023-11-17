import { useAppDispatch } from '@/hooks';
import TextArea from 'antd/es/input/TextArea';
import { scheduleSlice } from '@/components/ServiceModal/components/slice';
import * as Styled from '@/components/ServiceModal/ServiceModal.styled';

const InputNote = () => {
    const dispatch = useAppDispatch();

    const handleNoteChange = (value: any) => {
        dispatch(scheduleSlice.actions.setNote(value.target.value));
        dispatch(
            scheduleSlice.actions.setSchedule({ fieldName: 'note', value: value.target.value }),
        );
    };

    return (
        <Styled.ServiceForm.Item label="Ghi chú" name="note" wrapperCol={{ offset: 0, span: 24 }}>
            <TextArea
                showCount
                maxLength={100}
                style={{ height: 120, marginBottom: 24 }}
                placeholder="Ghi chú của bạn"
                onChange={handleNoteChange}
            />
        </Styled.ServiceForm.Item>
    );
};

export default InputNote;
