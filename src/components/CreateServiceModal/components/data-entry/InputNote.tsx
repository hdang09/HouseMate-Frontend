import { useAppDispatch } from '@/hooks';
import TextArea from 'antd/es/input/TextArea';
import * as Styled from '@/components/CreateServiceModal/ServiceModal.styled';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';

const InputNote = () => {
    const dispatch = useAppDispatch();

    //TODO: Optimize performance
    const handleNoteChange = (value: any) => {
        dispatch(scheduleSlice.actions.setNote(value.target.value));
        dispatch(
            scheduleSlice.actions.setSchedule({ fieldName: 'note', value: value.target.value }),
        );
    };

    return (
        <Styled.ServiceForm.Item label="Note" name="note" wrapperCol={{ offset: 0, span: 24 }}>
            <TextArea
                showCount
                maxLength={100}
                placeholder="Write your note"
                onChange={handleNoteChange}
            />
        </Styled.ServiceForm.Item>
    );
};

export default InputNote;
