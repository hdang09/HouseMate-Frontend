import { useAppDispatch } from '@/hooks';
import { Form, Select } from 'antd';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';
import { riceType, waterType } from '../../CreateServiceModal.types';

type InputServiceProps = {
    setCategory: (category: string) => void;
};

type ServiceType = {
    serviceId: number;
    serviceName: string;
    category: string;
    type: string[];
};

// TODO: wait for api
const serviceList: ServiceType[] = [
    {
        serviceId: 1,
        serviceName: 'Cleaning House',
        category: 'HOURLY_SERVICE',
        type: ['tối đa 80m^2', 'tối đa 30m^2', 'tối đa 50m^2'],
    },
    {
        serviceId: 2,
        serviceName: 'Laundry',
        category: 'RETURN_SERVICE',
        type: ['quần áo', 'chăn/mền/mùng/drap', 'topper', 'gấu bông', 'gối'],
    },
    {
        serviceId: 3,
        serviceName: 'Water delivery',
        category: 'DELIVERY_SERVICE',
        type: waterType,
    },
    {
        serviceId: 4,
        serviceName: 'Rice delivery',
        category: 'DELIVERY_SERVICE',
        type: riceType,
    },
];

const InputService = ({ setCategory }: InputServiceProps) => {
    const dispatch = useAppDispatch();

    const handleServiceChange = (value: string) => {
        const service: ServiceType = JSON.parse(value);
        localStorage.setItem('category', service.category);
        setCategory(service.category);
        dispatch(scheduleSlice.actions.setServiceId(service.serviceId));
        dispatch(
            scheduleSlice.actions.setSchedule({ fieldName: 'category', value: service.category }),
        );
        dispatch(
            scheduleSlice.actions.setSchedule({
                fieldName: 'serviceId',
                value: service.serviceId,
            }),
        );
        dispatch(scheduleSlice.actions.setTypes(service.type));
    };

    return (
        <Form.Item
            label="Service"
            name="service"
            rules={[{ required: true, message: 'Service cannot be empty!!' }]}
            wrapperCol={{ offset: 0, span: 12 }}
        >
            {/* //TODO : wait for api  */}
            <Select placeholder="Choose service" onChange={handleServiceChange}>
                {serviceList.map((service) => {
                    return (
                        <Select.Option value={JSON.stringify(service)} key={service.serviceId}>
                            {service.serviceName}
                        </Select.Option>
                    );
                })}
            </Select>
        </Form.Item>
    );
};

export default InputService;
