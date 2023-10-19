import * as Styled from '@/pages/Admin/CreateSingleService/CreateSingleService.styled';
import { InputNumber } from 'antd';

type InputPriceProps = {
    label: string;
    name: string;
};
const InputPrice = ({ label, name }: InputPriceProps) => {
    return (
        <Styled.ServiceDetailForm.Item
            label={label}
            name={name}
            wrapperCol={{ offset: 0, span: 24 }}
            rules={[{ required: true, message: 'Quantity cannot be empty!!' }]}
        >
            <InputNumber
                // defaultValue={1000}
                style={{ width: 150 }}
                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                // onChange={onChange}
            />
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputPrice;
