import { DatePicker, DatePickerProps } from 'antd';

import dayjs from 'dayjs';
import { scheduleSlice } from '@/components/ServiceModal/components/slice';
import { useAppDispatch } from '@/hooks';
import * as Styled from '@/components/ServiceModal/ServiceModal.styled';

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
        <Styled.ServiceForm.Item
            label={'Ngày'}
            name={'Date'}
            rules={[{ required: true, message: 'Ngày không được để trống!!' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <DatePicker
                format="DD/MM/YYYY"
                onChange={handleDateChange}
                disabledDate={disabledDate}
                placeholder="Chọn ngày sử dụng dịch vụ"
                changeOnBlur
            />
        </Styled.ServiceForm.Item>
    );
};

export default InputDate;
