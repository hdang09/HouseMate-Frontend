import { useAppDispatch } from '@/hooks';
import { TimePicker } from 'antd';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { scheduleSlice } from '@/components/ServiceModal/components/slice';
import { useEffect, useState } from 'react';
import * as Styled from '@/components/ServiceModal/ServiceModal.styled';
import { ServiceConfigType } from '@/pages/Admin/Setting/UnitConfig/components/UnitConfig.type';
import { getServiceConfigByType } from '@/utils/configAPI';
import { Config } from '@/utils/enums';

type InputTimeProps = {
    type?: string;
    label?: string;
};

const InputTime = ({ type, label }: InputTimeProps) => {
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(0);
    const dispatch = useAppDispatch();
    const [time, setTime] = useState<Dayjs | null>();

    const handleTimeChange = (time: Dayjs | null, timeString: string) => {
        setTime(time);
        dispatch(scheduleSlice.actions.setTime(timeString));
        dispatch(
            scheduleSlice.actions.setSchedule({ fieldName: type || 'time', value: timeString }),
        );
    };

    const getHourConfig = async () => {
        try {
            const { data }: { data: ServiceConfigType[] } = await getServiceConfigByType(
                Config.OFFICE_HOURS_START,
            );
            setStart(Number.parseInt(data[0].configValue));

            const { data: endTime }: { data: ServiceConfigType[] } = await getServiceConfigByType(
                Config.OFFICE_HOURS_END,
            );
            setEnd(Number.parseInt(endTime[0].configValue));
        } catch (error: any) {
            console.log(error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        getHourConfig();
    }, []);

    const disabledTime = () => {
        const disabledHours = () => {
            const startHour = start || 0;
            const endHour = end || 24;

            const hours = [];
            for (let i = 0; i < 24; i++) {
                if (i < startHour || i >= endHour) {
                    hours.push(i);
                }
            }
            return hours;
        };

        const disabledMinutes = (selectedHour: any) => {
            if (selectedHour === start) {
                // If the selected hour is the same as the start hour, disable minutes before start minute
                return Array.from({ length: start }, (_, index) => index);
            } else if (selectedHour === end - 1) {
                // If the selected hour is the same as the end hour, disable minutes after end minute
                return Array.from({ length: 60 - end }, (_, index) => index + end);
            }
            // Disable all minutes for other hours
            return [];
        };

        return {
            disabledHours,
            disabledMinutes,
        };
    };

    return (
        <Styled.ServiceForm.Item
            label={label || 'Thời gian'}
            name={type || 'time'}
            rules={[{ required: true, message: 'Thời gian không được để trống!!' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <TimePicker
                minuteStep={15}
                hourStep={1}
                format="HH:mm"
                placeholder="Chọn thời gian"
                disabledTime={disabledTime}
                onChange={handleTimeChange}
                changeOnBlur
                value={dayjs(time)}
            />
        </Styled.ServiceForm.Item>
    );
};

export default InputTime;
