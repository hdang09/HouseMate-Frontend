import { useAppDispatch, useAppSelector } from '@/hooks';
import { InputNumber } from 'antd';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';
import * as Styled from '@/components/CreateServiceModal/CreateServiceModal.styled';

const InputQuantity = () => {
    const quantity = useAppSelector((state) => state.schedules.quantity);
    const dispatch = useAppDispatch();

    const handleQuantityChange = (value: any) => {
        dispatch(scheduleSlice.actions.setQuantity(value));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'quantity', value: value }));
    };

    return (
        <Styled.ServiceForm.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, message: 'Số lượng không được để trống!!' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <InputNumber
                min={1}
                max={10}
                onChange={handleQuantityChange}
                value={quantity}
                placeholder="Chọn số lượng"
            />
        </Styled.ServiceForm.Item>
    );
};

export default InputQuantity;
