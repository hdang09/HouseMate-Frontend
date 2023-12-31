import { Select, Spin } from 'antd';
import { useEffect, useState } from 'react';

import { ModalEnum, ServiceCategory } from '@/utils/enums';
import { getAllPurchased } from '@/utils/scheduleAPI';
import { scheduleSlice } from '@/components/ServiceModal/components/slice';
import { useAppDispatch } from '@/hooks';

import * as Styled from '@/components/ServiceModal/ServiceModal.styled';
import { UsagesType } from '../slice/initialState';

type InputServiceProps = {
    setCategory: (category: ServiceCategory) => void;
    resetForm?: () => void;
    serviceList: ServiceType[];
    setServiceList?: (service: ServiceType[]) => void;
    variant: ModalEnum;
};

export type TypeListType = {
    serviceTypeId?: number;
    serviceId?: number;
    typeName?: string;
};

export type ServiceType = {
    serviceId: number;
    titleName: string;
    groupType: ServiceCategory;
    type: TypeListType[];
    usages: UsagesType[];
};

const InputService = ({
    setCategory,
    resetForm,
    serviceList,
    setServiceList,
    variant,
}: InputServiceProps) => {
    const dispatch = useAppDispatch();
    const [status, setStatus] = useState<Number>(0);
    useEffect(() => {
        (async () => {
            const { data, status } = await getAllPurchased();
            setStatus(status);
            if (setServiceList) setServiceList(data);
        })();
    }, []);

    const handleServiceChange = (value: string) => {
        if (resetForm) resetForm();
        dispatch(scheduleSlice.actions.resetSchedule());
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
            <Styled.ServiceForm.Item
                label="Dịch vụ"
                name="service"
                rules={[{ required: true, message: 'Dịch vụ không được để trống!!' }]}
                wrapperCol={{ offset: 0, span: 24 }}
            >
                {status === 200 ? (
                    <Select
                        placeholder="Chọn dịch vụ"
                        onChange={handleServiceChange}
                        disabled={variant === ModalEnum.VIEW}
                    >
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
                ) : (
                    <Spin />
                )}
            </Styled.ServiceForm.Item>
        </>
    );
};

export default InputService;
