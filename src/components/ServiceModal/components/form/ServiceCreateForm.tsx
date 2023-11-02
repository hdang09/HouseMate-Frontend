import * as Styled from '@/components/ServiceModal/ServiceModal.styled';

import { FormType } from '@/components/ServiceModal/ServiceModal';
import InputFields from '@/components/ServiceModal/Service.fields';
import InputService, { ServiceType } from '@/components/ServiceModal/components/data-entry/InputService';
import { ServiceCategory } from '@/utils/enums';
import dayjs from 'dayjs';
import { useEffect } from 'react';

type ServiceCreateFormProps = {
    form: FormType;
    category: ServiceCategory;
    setCategory: (service: ServiceCategory) => void;
    onSubmit: (value: any) => void;
    onSubmitFailed: (error: any) => void;
    serviceList: ServiceType[];
    setServiceList: (service: ServiceType[]) => void;
};

const ServiceCreateForm = ({
    form,
    category,
    setCategory,
    onSubmit,
    onSubmitFailed,
    serviceList,
    setServiceList,
}: ServiceCreateFormProps) => {
    useEffect(() => {
        // avoid date range get undefine value. Solve TypeError: date.locale error
        form.setFieldsValue({
            dateRange: dayjs(),
        });
    }, []);

    const resetForm = () => {
        form.setFieldsValue({
            Date: '',
            timeRange: '',
            cycle: '',
            note: '',
            dateRange: [],
            time: '',
            type: '',
            quantity: '',
            receivedTime: '',
            usage: '',
        });
    };

    return (
        <Styled.ServiceForm
            form={form}
            onFinish={onSubmit}
            onFinishFailed={onSubmitFailed}
            wrapperCol={{ span: 24 }}
            layout="horizontal"
            style={{ maxWidth: 800 }}
        >
            <InputService
                setCategory={setCategory}
                resetForm={resetForm}
                setServiceList={setServiceList}
                serviceList={serviceList}
            />

            <InputFields category={category} />
        </Styled.ServiceForm>
    );
};

export default ServiceCreateForm;
