import { TimePicker } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks';
import * as Styled from '@/components/CreateServiceModal/CreateServiceModal.styled';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';

const InputTimeRange = () => {
    const timeRanges = useAppSelector((state) => state.schedules.timeRanges);
    const dispatch = useAppDispatch();

    //TODO: change type of parameters
    const handleTimeChange = (_: any, timeString: any) => {
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
        <Styled.ServiceForm.Item
            label="Thời gian"
            name="timeRange"
            rules={[{ required: true, message: 'Thời gian không được để trống !!!' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <TimePicker.RangePicker
                minuteStep={15}
                hourStep={1}
                format="HH:mm"
                onChange={handleTimeChange}
                changeOnBlur
                placeholder={['Ngày nhận', 'Ngày trả']}
                value={timeRanges}
                disabledTime={disabledTime}
            />
        </Styled.ServiceForm.Item>
    );
};

export default InputTimeRange;
