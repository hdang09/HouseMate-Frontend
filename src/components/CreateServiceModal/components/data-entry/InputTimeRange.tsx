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

    const disabledTime = () => {
        return {
            disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 18, 19, 20, 21, 22, 23],
            disabledMinutes: () => [],
        };
    };

    return (
        <Form.Item
            label="Time"
            name="timeRange"
            rules={[{ required: true, message: 'Time cannot be empty!!' }]}
            wrapperCol={{ offset: 0, span: 12 }}
        >
            <TimePicker.RangePicker
                minuteStep={15}
                hourStep={1}
                format="HH:mm"
                onChange={handleTimeChange}
                value={timeRanges}
                disabledTime={disabledTime}
            />
        </Form.Item>
    );
};

export default InputTimeRange;
