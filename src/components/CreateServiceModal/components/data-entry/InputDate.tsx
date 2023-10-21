import { DatePicker, DatePickerProps, Form } from 'antd';

import dayjs from 'dayjs';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';
import { useAppDispatch } from '@/hooks';

const InputDate = () => {
    const dispatch = useAppDispatch();
    // const [date, setDate] = useState<Dayjs | null>(dayjs());
    const handleDateChange: DatePickerProps['onChange'] = (_, dateString) => {
        dispatch(scheduleSlice.actions.setDate(dateString));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'date', value: dateString }));
    };

    const disabledDate: DatePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().startOf('day');
    };

    return (
        <Form.Item
            label={'Date'}
            name={'Date'}
            rules={[{ required: true, message: 'Date cannot be empty!!' }]}
            wrapperCol={{ offset: 0, span: 12 }}
        >
            <DatePicker
                format="DD/MM/YYYY"
                onChange={handleDateChange}
                disabledDate={disabledDate}
                changeOnBlur
            />
        </Form.Item>
    );
};

export default InputDate;
