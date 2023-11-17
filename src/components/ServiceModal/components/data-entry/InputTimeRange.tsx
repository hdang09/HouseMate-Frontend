import { TimePicker } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks';
import * as Styled from '@/components/ServiceModal/ServiceModal.styled';
import { scheduleSlice } from '@/components/ServiceModal/components/slice';
import { ServiceConfigType } from '@/pages/Admin/Setting/UnitConfig/components/UnitConfig.type';
import { getServiceConfigByType } from '@/utils/configAPI';
import { Config } from '@/utils/enums';
import { useEffect, useState } from 'react';

const InputTimeRange = () => {
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(0);
    const timeRanges = useAppSelector((state) => state.schedules.timeRanges);
    const dispatch = useAppDispatch();

    const handleTimeChange = (_: any, timeString: any) => {
        dispatch(scheduleSlice.actions.setTimeRanges(timeString));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'timeRanges', value: timeString }));
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
