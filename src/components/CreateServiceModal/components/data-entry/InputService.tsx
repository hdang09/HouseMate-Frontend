import { Select, Spin } from 'antd';
import { useEffect, useState } from 'react';

import { ServiceCategory } from '@/utils/enums';
import { getAllPurchased } from '@/utils/scheduleAPI';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';
import { useAppDispatch } from '@/hooks';

import * as Styled from '@/components/CreateServiceModal/CreateServiceModal.styled';
import { UsagesType } from '../slice/initialState';

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
    usages: UsagesType[];
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
        dispatch(scheduleSlice.actions.setUserUsage(service.usages));
    };

    return (
        <>
            {serviceList.length > 0 ? (
                <Styled.ServiceForm.Item
                    label="Dịch vụ"
                    name="service"
                    rules={[{ required: true, message: 'Dịch vụ không được để trống!!' }]}
                    wrapperCol={{ offset: 0, span: 24 }}
                >
                    <Select placeholder="Chọn dịch vụ" onChange={handleServiceChange}>
                        {serviceList.map((service) => {
                            return (
                                <Select.Option
                                    value={JSON.stringify(service)}
                                    key={service.serviceId}
                                >
                                    {service.titleName}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Styled.ServiceForm.Item>
            ) : (
                <Spin size="large" />
            )}
        </>
    );
};

export default InputService;
