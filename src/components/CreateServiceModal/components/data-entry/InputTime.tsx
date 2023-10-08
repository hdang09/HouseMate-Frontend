import { useAppDispatch, useAppSelector } from '@/hooks';
import { Form, TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';

type InputTimeProps = {
    type?: string;
};

const InputTime = ({ type }: InputTimeProps) => {
    const time = useAppSelector((state) => state.schedules.time);
    const dispatch = useAppDispatch();

    const handleTimeChange = (time: Dayjs | null, timeString: string) => {
        console.log(time);
        dispatch(scheduleSlice.actions.setTime(timeString));
        dispatch(
            scheduleSlice.actions.setSchedule({ fieldName: type || 'time', value: timeString }),
        );
    };

    return (
        <Form.Item
            label="Time"
            name={type || 'time'}
            rules={[{ required: true, message: 'Time cannot be empty!!' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <TimePicker format="HH:mm" onChange={handleTimeChange} value={dayjs(time)} />
        </Form.Item>
    );
};

export default InputTime;
