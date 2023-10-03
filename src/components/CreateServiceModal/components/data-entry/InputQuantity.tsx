import { useAppDispatch, useAppSelector } from '@/hooks';
import { Form, InputNumber } from 'antd';
import { scheduleSlice } from '../slice';

const InputQuantity = () => {
    const quantity = useAppSelector((state) => state.schedules.quantity);
    const dispatch = useAppDispatch();

    const handleQuantityChange = (value: any) => {
        dispatch(scheduleSlice.actions.setQuantity(value));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'quantity', value: value }));
    };

    return (
        <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Quantity cannot be empty!!' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <InputNumber min={1} max={10} onChange={handleQuantityChange} value={quantity} />
        </Form.Item>
    );
};

export default InputQuantity;
