import { useAppDispatch } from '@/hooks';
import { Form, Select } from 'antd';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';

type InputServiceProps = {
    setCategory: (category: string) => void;
};

export type TypeListType = {
    serviceTypeId?: number;
    serviceId?: number;
    typeName?: string;
};

type ServiceType = {
    serviceId: number;
    titleName: string;
    groupType: string;
    type: TypeListType[];
};

// TODO: wait for api
const serviceList: ServiceType[] = [
    {
        serviceId: 1,
        titleName: 'Cleaning House',
        groupType: 'HOURLY_SERVICE',
        type: [
            {
                serviceTypeId: 1,
                serviceId: 1,
                typeName: 'tối đa 80m^2',
            },
            {
                serviceTypeId: 2,
                serviceId: 1,
                typeName: 'tối đa 30m^2',
            },
            {
                serviceTypeId: 3,
                serviceId: 1,
                typeName: 'tối đa 50m^2',
            },
        ],
    },
    {
        serviceId: 2,
        titleName: 'Laundry',
        groupType: 'RETURN_SERVICE',
        type: [
            {
                serviceTypeId: 4,
                serviceId: 2,
                typeName: 'quần áo',
            },
            {
                serviceTypeId: 5,
                serviceId: 2,
                typeName: 'chăn/mền/mùng/drap',
            },
            {
                serviceTypeId: 6,
                serviceId: 2,
                typeName: 'topper',
            },
            {
                serviceTypeId: 7,
                serviceId: 2,
                typeName: 'gấu bông',
            },
            {
                serviceTypeId: 8,
                serviceId: 2,
                typeName: 'gối',
            },
        ],
    },
    {
        serviceId: 3,
        titleName: 'Water delivery',
        groupType: 'DELIVERY_SERVICE',
        type: [
            {
                serviceTypeId: 9,
                serviceId: 3,
                typeName: 'Bidrico purified water 20L',
            },
            {
                serviceTypeId: 10,
                serviceId: 3,
                typeName: 'VIHAWA purified water 20L',
            },
            {
                serviceTypeId: 11,
                serviceId: 3,
                typeName: 'VIHAWA purified water 20L',
            },
            {
                serviceTypeId: 12,
                serviceId: 3,
                typeName: 'LAVIE mineral water 19L',
            },
        ],
    },
    {
        serviceId: 4,
        titleName: 'Rice delivery',
        groupType: 'DELIVERY_SERVICE',
        type: [
            {
                serviceTypeId: 12,
                serviceId: 4,
                typeName: 'ST25 rice',
            },
            {
                serviceTypeId: 12,
                serviceId: 4,
                typeName: 'ST24 rice',
            },
            {
                serviceTypeId: 12,
                serviceId: 4,
                typeName: 'Thailand rice',
            },
            {
                serviceTypeId: 12,
                serviceId: 4,
                typeName: 'Jasmine rice',
            },
        ],
    },
];

const InputService = ({ setCategory }: InputServiceProps) => {
    const dispatch = useAppDispatch();

    const handleServiceChange = (value: string) => {
        const service: ServiceType = JSON.parse(value);
        localStorage.setItem('category', service.groupType);
        setCategory(service.groupType);
        dispatch(scheduleSlice.actions.setServiceId(service.serviceId));
        dispatch(
            scheduleSlice.actions.setSchedule({ fieldName: 'category', value: service.groupType }),
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
                            {service.titleName}
                        </Select.Option>
                    );
                })}
            </Select>
        </Form.Item>
    );
};

export default InputService;
