import { useAppDispatch } from '@/hooks';
import { DatePicker } from 'antd';
import { scheduleSlice } from '@/components/ServiceModal/components/slice';
import type { Dayjs } from 'dayjs';
import { RangePickerProps } from 'antd/es/date-picker';
import { useState } from 'react';
import dayjs from 'dayjs';
import * as Styled from '@/components/ServiceModal/ServiceModal.styled';

type RangeValue = [Dayjs | null, Dayjs | null] | null;
const { RangePicker } = DatePicker;

const InputDateRange = () => {
    const dispatch = useAppDispatch();

    const onOpenChange = (open: boolean) => {
        if (open) {
            setDates([null, null]);
        } else {
            setDates(null);
        }
    };

    const handleDateChange: RangePickerProps['onChange'] = (date, dateString) => {
        setValue(date);
        dispatch(scheduleSlice.actions.setPickUpDate(dateString[0]));
        dispatch(scheduleSlice.actions.setReceiveDate(dateString[1]));
        dispatch(
            scheduleSlice.actions.setSchedule({ fieldName: 'pickUpDate', value: dateString[0] }),
        );
        dispatch(
            scheduleSlice.actions.setSchedule({ fieldName: 'receiveDate', value: dateString[1] }),
        );
    };

    const [dates, setDates] = useState<RangeValue>(null);
    const [value, setValue] = useState<RangeValue>(null);

    const disabledDate = (current: Dayjs) => {
        if (current.isBefore(dayjs(), 'day')) {
            return true;
        }
        if (!dates) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') >= 7;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 7;
        return !!tooEarly || !!tooLate;
    };

    return (
        <Styled.ServiceForm.Item
            label={'Ngày nhận/Trả'}
            name={'dateRange'}
            rules={[{ required: true, message: 'Ngày không được để trống!!' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <RangePicker
                value={dates || value}
                disabledDate={disabledDate}
                onCalendarChange={(val) => {
                    setDates(val);
                }}
                format="DD/MM/YYYY"
                onChange={handleDateChange}
                onOpenChange={onOpenChange}
                changeOnBlur
            />
        </Styled.ServiceForm.Item>
    );
};

export default InputDateRange;
