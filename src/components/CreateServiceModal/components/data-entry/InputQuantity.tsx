import { useAppDispatch, useAppSelector } from '@/hooks';
import { InputNumber } from 'antd';
import * as Styled from '@/components/CreateServiceModal/ServiceModal.styled';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';

const InputQuantity = () => {
    const quantity = useAppSelector((state) => state.schedules.quantity);
    const dispatch = useAppDispatch();

    const handleQuantityChange = (value: any) => {
        dispatch(scheduleSlice.actions.setQuantity(value));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'quantity', value: value }));
    };

    return (
        <Styled.ServiceForm.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Quantity cannot be empty!!' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <InputNumber min={1} max={10} onChange={handleQuantityChange} value={quantity} />
        </Styled.ServiceForm.Item>
    );
};

export default InputQuantity;
