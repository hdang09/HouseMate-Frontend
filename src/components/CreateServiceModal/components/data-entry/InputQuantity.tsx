import { Form, InputNumber } from 'antd';

const InputQuantity = () => {
    return (
        <Form.Item label="Quantity" name="quantity">
            <InputNumber min={1} max={10} defaultValue={1} />
        </Form.Item>
    );
};

export default InputQuantity;
