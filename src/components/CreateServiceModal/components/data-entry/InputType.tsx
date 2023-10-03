import { Form, Select } from 'antd';
import { brandType } from '../../CreateServiceModal.types';

type InputTypeProps = {
    type: brandType[];
};

function InputType({ type }: InputTypeProps) {
    return (
        <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Type cannot be empty!!' }]}
        >
            <Select placeholder="Choose type">
                {type.map((type, index) => {
                    return (
                        <Select.Option value={type.value} key={index}>
                            {type.label}
                        </Select.Option>
                    );
                })}
            </Select>
        </Form.Item>
    );
}

export default InputType;
