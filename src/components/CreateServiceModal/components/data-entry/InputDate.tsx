import { useAppDispatch } from '@/hooks';
import { DatePicker, DatePickerProps, Form } from 'antd';
import { scheduleSlice } from '../slice';

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
        dispatch(
            scheduleSlice.actions.setSchedule({ fieldName: type || 'date', value: dateString }),
        );
    };

    return (
        <Form.Item label={label} name={type || 'Date'}>
            <DatePicker format="DD/MM/YYYY" onChange={handleDateChange} />
        </Form.Item>
    );
};

export default InputDate;
