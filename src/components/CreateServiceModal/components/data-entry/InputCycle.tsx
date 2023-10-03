import { Form, Select } from 'antd';

const InputCycle = () => {
    return (
        <Form.Item
            label="Cycle"
            name="cycle"
            rules={[{ required: true, message: 'Cycle cannot be empty!!' }]}
        >
            <Select placeholder="Choose cycle">
                <Select.Option value="only-one-time">Only one time</Select.Option>
                <Select.Option value="every-week">Every week</Select.Option>
            </Select>
        </Form.Item>
    );
};

export default InputCycle;
