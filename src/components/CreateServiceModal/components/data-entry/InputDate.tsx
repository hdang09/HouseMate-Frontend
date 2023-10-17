import { useAppDispatch } from '@/hooks';
import { DatePicker, DatePickerProps, Form } from 'antd';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';
import dayjs from 'dayjs';

const InputDate = () => {
    const dispatch = useAppDispatch();
    // const [date, setDate] = useState<Dayjs | null>(dayjs());
    const handleDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date);
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
            />
        </Form.Item>
    );
};

export default InputDate;
