import { useAppDispatch } from '@/hooks';
import { Form, TimePicker } from 'antd';
import { scheduleSlice } from '../slice';

const InputTimeRange = () => {
    const dispatch = useAppDispatch();

    const handleTimeChange = (time: any, timeString: any) => {
        console.log(time);
        dispatch(scheduleSlice.actions.setTimeRanges(timeString));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'timeRanges', value: timeString }));
    };

    return (
        <Form.Item label="Time" name="timeRange">
            <TimePicker.RangePicker format="HH:mm" onChange={handleTimeChange} />
        </Form.Item>
    );
};

export default InputTimeRange;
