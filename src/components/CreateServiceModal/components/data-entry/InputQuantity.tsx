import { useAppDispatch } from '@/hooks';
import { Form, InputNumber } from 'antd';
import { scheduleSlice } from '../slice';

const InputQuantity = () => {
    const dispatch = useAppDispatch();

    const handleQuantityChange = (value: any) => {
        dispatch(scheduleSlice.actions.setQuantity(value));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'quantity', value: value }));
    };

    return (
        <Form.Item label="Quantity" name="quantity">
            <InputNumber min={1} max={10} defaultValue={1} onChange={handleQuantityChange} />
        </Form.Item>
    );
};

export default InputQuantity;
