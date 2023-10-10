import { useAppDispatch, useAppSelector } from '@/hooks';
import { Form, TimePicker } from 'antd';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';

const InputTimeRange = () => {
    const timeRanges = useAppSelector((state) => state.schedules.timeRanges);
    const dispatch = useAppDispatch();

    //TODO: change type of parameters
    const handleTimeChange = (time: any, timeString: any) => {
        console.log(time);
        dispatch(scheduleSlice.actions.setTimeRanges(timeString));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'timeRanges', value: timeString }));
    };

    return (
        <Form.Item
            label="Time"
            name="timeRange"
            rules={[{ required: true, message: 'Time cannot be empty!!' }]}
            wrapperCol={{ offset: 0, span: 12 }}
        >
            <TimePicker.RangePicker format="HH:mm" onChange={handleTimeChange} value={timeRanges} />
        </Form.Item>
    );
};

export default InputTimeRange;
