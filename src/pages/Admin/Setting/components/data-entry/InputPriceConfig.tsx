import * as Styled from '@/pages/Admin/Setting/styled';
import { InputNumber } from 'antd';

type InputPriceProps = {
    label: string;
    name: string;
};

const InputPriceConfig = ({ label, name }: InputPriceProps) => {
    const onChange = (value: number | null) => {};

    return (
        <Styled.SettingForm.Item
            label={label}
            name={name}
            wrapperCol={{ offset: 0, span: 24 }}
            rules={[{ required: true, message: 'Vui lòng điền tỉ giá!!' }]}
        >
            <InputNumber
                style={{ width: 250 }}
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                onChange={onChange}
                min={0.1}
            />
        </Styled.SettingForm.Item>
    );
};

export default InputPriceConfig;
