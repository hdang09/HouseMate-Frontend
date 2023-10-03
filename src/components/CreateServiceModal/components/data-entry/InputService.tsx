import { Form, Select } from 'antd';

type InputServiceProps = {
    setService: (service: string) => void;
};

const InputService = ({ setService }: InputServiceProps) => {
    const handleServiceChange = (value: string) => {
        setService(value);
    };
    return (
        <Form.Item
            label="Service"
            name="service"
            rules={[{ required: true, message: 'Service cannot be empty!!' }]}
        >
            <Select placeholder="Choose service" onChange={handleServiceChange}>
                <Select.Option value="cleaning-house">Cleaning House</Select.Option>
                <Select.Option value="laundry">Laundry</Select.Option>
                <Select.Option value="water-delivery">Water delivery</Select.Option>
                <Select.Option value="rice-delivery">Rice delivery</Select.Option>
            </Select>
        </Form.Item>
    );
};

export default InputService;
