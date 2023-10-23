// import { useAppDispatch, useAppSelector } from '@/hooks';
import { useAppDispatch } from '@/hooks';
import { InputNumber } from 'antd';
import { createServiceSlice } from '../slice';

type InputQuantityType = {
    name: number;
};

const InputQuantity = ({ name }: InputQuantityType) => {
    const dispatch = useAppDispatch();

    const handleQuantityChange = (value: any) => {
        dispatch(createServiceSlice.actions.setQuantityChild({ index: name, value: value }));
    };

    return <InputNumber min={1} onChange={handleQuantityChange} />;
};

export default InputQuantity;
