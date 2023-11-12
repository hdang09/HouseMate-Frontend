import { useAppDispatch, useAppSelector } from '@/hooks';
import { Select } from 'antd';
import { createServiceSlice } from '../slice';
import { useEffect, useState } from 'react';
import { getSingleService } from '@/utils/serviceAPI';

type ServiceType = {
    serviceId: number;
    titleName: string;
    originalPrice: string;
    finalPrice: string;
    unitOfMeasure: string;
    description: string;
    saleStatus: string;
    groupType: string;
    avgRating: number;
    numberOfSold: string;
    mainImg: string;
    package: boolean;
};

type InputSingleService = {
    index: number;
    value: string;
    onChange: (value: string) => void;
};

const InputSingleService = ({ index, value, onChange }: InputSingleService) => {
    const dispatch = useAppDispatch();
    const serviceChildren: string[] = [];
    useAppSelector((state) => state.createService.serviceList).forEach((item) => {
        serviceChildren.push(item.serviceID);
    });
    const [services, setServices] = useState<ServiceType[]>([]);

    const handleServiceChange = (value: string) => {
        const service: ServiceType = JSON.parse(value);
        if (service) {
            dispatch(
                createServiceSlice.actions.setServiceIdChild({
                    index: index,
                    serviceId: `${service.serviceId}`,
                    price: +service.originalPrice,
                }),
            );
        }
        onChange(service.titleName);
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getSingleService();
                setServices(data);
            } catch (error: any) {
                console.log(error.response ? error.response.data : error.message);
            } finally {
            }
        })();
    }, []);

    return (
        <Select placeholder="Dịch vụ đơn lẻ" onChange={handleServiceChange} value={value}>
            {services.map((service) => {
                if (!serviceChildren.find((item) => item === service.serviceId.toString()))
                    return (
                        <Select.Option value={JSON.stringify(service)} key={service.serviceId}>
                            {service.titleName}
                        </Select.Option>
                    );
            })}
        </Select>
    );
};

export default InputSingleService;
