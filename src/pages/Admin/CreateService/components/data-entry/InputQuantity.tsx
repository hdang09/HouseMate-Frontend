// import { useAppDispatch, useAppSelector } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { InputNumber } from 'antd';
import { createServiceSlice } from '../slice';
import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';
import { useState } from 'react';

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
