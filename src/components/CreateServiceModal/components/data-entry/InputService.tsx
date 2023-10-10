import { useAppDispatch } from '@/hooks';
import { Form, Select } from 'antd';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';

type InputServiceProps = {
    setService: (service: string) => void;
};

const InputService = ({ setService }: InputServiceProps) => {
    const dispatch = useAppDispatch();

    const handleServiceChange = (value: string) => {
        localStorage.setItem('serviceName', value);
        setService(value);
        dispatch(scheduleSlice.actions.setServiceName(value));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'serviceName', value: value }));
    };

    return (
        <Form.Item
            label="Service"
            name="service"
            rules={[{ required: true, message: 'Service cannot be empty!!' }]}
            wrapperCol={{ offset: 0, span: 12 }}
        >
            //TODO : wait for api 
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
