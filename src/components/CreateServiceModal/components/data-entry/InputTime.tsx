import { useAppDispatch } from '@/hooks';
import { Form, TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import { scheduleSlice } from '../slice';

type InputTimeProps = {
    type?: string;
};

const InputTime = ({ type }: InputTimeProps) => {
    const dispatch = useAppDispatch();

    const handleTimeChange = (time: Dayjs | null, timeString: string) => {
        console.log(time);
        dispatch(scheduleSlice.actions.setTime(timeString));
        dispatch(
            scheduleSlice.actions.setSchedule({ fieldName: type || 'time', value: timeString }),
        );
    };

    return (
        <Form.Item label="Time" name={type || 'time'}>
            <TimePicker format="HH:mm " onChange={handleTimeChange} />
        </Form.Item>
    );
};

export default InputTime;
