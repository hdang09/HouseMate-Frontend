// import { useAppDispatch, useAppSelector } from '@/hooks';
import { useAppDispatch } from '@/hooks';
import { InputNumber } from 'antd';
import { createServiceSlice } from '../slice';

type InputQuantityType = {
    name: number;
    value: number;
    onChange: (value: number) => void;
};

const InputQuantity = ({ name, value, onChange }: InputQuantityType) => {
    const dispatch = useAppDispatch();

    const handleQuantityChange = (value: any) => {
        dispatch(createServiceSlice.actions.setQuantityChild({ index: name, value: value }));
        onChange(value);
    };

    return <InputNumber min={1} onChange={handleQuantityChange} value={value} />;
};

export default InputQuantity;
