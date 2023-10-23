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

const InputSingleService = () => {
    const dispatch = useAppDispatch();
    const serviceChildren = useAppSelector((state) => state.createService.serviceChildList);
    const [loading, setLoading] = useState<boolean>(false);
    const [services, setServices] = useState<ServiceType[]>([]);

    const handleServiceChange = (value: string) => {
        dispatch(createServiceSlice.actions.setServiceChildList({ serviceID: value, quantity: 0 }));
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await getSingleService();
                setServices(data);
            } catch (error: any) {
                console.log(error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <Select placeholder="Dịch vụ đơn lẻ" onChange={handleServiceChange}>
            {services.map((service) => {
                if (!(service.serviceId in serviceChildren))
                    return (
                        <Select.Option value={service.serviceId} key={service.serviceId}>
                            {service.titleName}
                        </Select.Option>
                    );
            })}
        </Select>
    );
};

export default InputSingleService;
