// import { useAppDispatch, useAppSelector } from '@/hooks';
import { useAppDispatch } from '@/hooks';
import { InputNumber } from 'antd';
import { createServiceSlice } from '../slice';
import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';
import { theme } from '@/themes';
import { BsInfoCircle } from 'react-icons/bs';

type InputMinMaxType = {
    name: string;
    label: string;
};

const InputMinMax = ({ name, label }: InputMinMaxType) => {
    const dispatch = useAppDispatch();

    const handleChange = (value: any) => {
        if (name === 'min') {
            dispatch(createServiceSlice.actions.setMin(value));
        } else {
            dispatch(createServiceSlice.actions.setMax(value));
        }
    };

    return (
        <Styled.ServiceDetailForm.Item
            label={label}
            name={name}
            tooltip={{
                title: `Lượng ${label} trên 1 lần sử dụng dịch vụ`,
                color: theme.colors.primary,
                icon: (
                    <>
                        <BsInfoCircle color={theme.colors.info} />
                    </>
                ),
            }}
            rules={[{ required: true, message: `Vui lòng chọn ${label}` }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <InputNumber style={{ width: 132 }} min={1} onChange={handleChange} />
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputMinMax;
