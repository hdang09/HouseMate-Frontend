import { useAppDispatch } from '@/hooks';
import {  TimePicker } from 'antd';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';
import { useState } from 'react';
import * as Styled from '@/components/CreateServiceModal/CreateServiceModal.styled';

type InputTimeProps = {
    type?: string;
    label?: string;
};

const InputTime = ({ type, label }: InputTimeProps) => {
    const dispatch = useAppDispatch();
    const [time, setTime] = useState<Dayjs | null>();

    const handleTimeChange = (time: Dayjs | null, timeString: string) => {
        setTime(time);
        dispatch(scheduleSlice.actions.setTime(timeString));
        dispatch(
            scheduleSlice.actions.setSchedule({ fieldName: type || 'time', value: timeString }),
        );
    };

    const disabledTime = () => {
        return {
            disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 18, 19, 20, 21, 22, 23],
            disabledMinutes: () => [],
        };
    };

    return (
        <Styled.ServiceForm.Item
            label={label || 'Time'}
            name={type || 'time'}
            rules={[{ required: true, message: 'Time cannot be empty!!' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <TimePicker
                minuteStep={15}
                hourStep={1}
                format="HH:mm"
                disabledTime={disabledTime}
                onChange={handleTimeChange}
                changeOnBlur
                value={dayjs(time)}
            />
        </Styled.ServiceForm.Item>
    );
};

export default InputTime;
