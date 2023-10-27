import { Select } from 'antd';
import { useEffect, useState } from 'react';
import * as Styled from '@/components/CreateServiceModal/ServiceModal.styled';

import { ServiceCategory } from '@/utils/enums';
import { getAllPurchased } from '@/utils/scheduleAPI';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';
import { useAppDispatch } from '@/hooks';

type InputServiceProps = {
    setCategory: (category: ServiceCategory) => void;
};

export type TypeListType = {
    serviceTypeId?: number;
    serviceId?: number;
    typeName?: string;
};

type ServiceType = {
    serviceId: number;
    titleName: string;
    groupType: ServiceCategory;
    type: TypeListType[];
};

const InputService = ({ setCategory }: InputServiceProps) => {
    const dispatch = useAppDispatch();

    const [serviceList, setServiceList] = useState<ServiceType[]>([]);
    useEffect(() => {
        (async () => {
            const { data } = await getAllPurchased();
            setServiceList(data);
        })();
    }, []);

    const handleServiceChange = (value: string) => {
        const service: ServiceType = JSON.parse(value);
        localStorage.setItem('groupType', service.groupType);
        setCategory(service.groupType);
        dispatch(scheduleSlice.actions.setServiceId(service.serviceId));
        dispatch(
            scheduleSlice.actions.setSchedule({ fieldName: 'groupType', value: service.groupType }),
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
        <Styled.ServiceForm.Item
            label="Service"
            name="service"
            rules={[{ required: true, message: 'Service cannot be empty!!' }]}
            wrapperCol={{ offset: 0, span: 16 }}
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
        </Styled.ServiceForm.Item>
    );
};

export default InputService;
