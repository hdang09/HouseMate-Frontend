import { useAppDispatch } from '@/hooks';
import { DatePicker, DatePickerProps, Form } from 'antd';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

type InputDate = {
    label: string;
    type?: string;
};

const InputDate = ({ label, type }: InputDate) => {
    const dispatch = useAppDispatch();

    const handleDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date);

        if (type == 'pick-up-date') dispatch(scheduleSlice.actions.setPickUpDate(dateString));
        else if (type == 'received-date')
            dispatch(scheduleSlice.actions.setReceiveDate(dateString));
        else dispatch(scheduleSlice.actions.setDate(dateString));
    };

    const disabledDate = (current: Dayjs) => {
        // If the date is before today, disable it
        return current && current < dayjs(new Date().setHours(0, 0, 0, 0));
    };

    return (
        <Form.Item
            label={label}
            name={type || 'Date'}
            rules={[{ required: true, message: 'Date cannot be empty!!' }]}
            wrapperCol={{ offset: 0, span: 12 }}
        >
            <DatePicker
                format="DD/MM/YYYY"
                onChange={handleDateChange}
                disabledDate={disabledDate}
            />
        </Form.Item>
    );
};

export default InputDate;
