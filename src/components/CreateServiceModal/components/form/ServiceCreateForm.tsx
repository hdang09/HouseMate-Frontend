import * as Styled from '@/components/CreateServiceModal/ServiceModal.styled';

import { FormType } from '@/components/CreateServiceModal/ServiceModal';
import InputFields from '@/components/CreateServiceModal/CreateService.fields';
import InputService from '@/components/CreateServiceModal/components/data-entry/InputService';
import { ServiceCategory } from '@/utils/enums';
import dayjs from 'dayjs';
import { useEffect } from 'react';

type ServiceCreateFormProps = {
    form: FormType;
    category: ServiceCategory;
    setCategory: (service: ServiceCategory) => void;
    onSubmit: (value: any) => void;
    onSubmitFailed: (error: any) => void;
};

const ServiceCreateForm = ({
    form,
    category,
    setCategory,
    onSubmit,
    onSubmitFailed,
}: ServiceCreateFormProps) => {
    useEffect(() => {
        // avoid date range get undefine value. Solve TypeError: date.locale error
        form.setFieldsValue({
            dateRange: dayjs(),
        });
    }, []);

    return (
        <Styled.ServiceForm
            form={form}
            onFinish={onSubmit}
            onFinishFailed={onSubmitFailed}
            wrapperCol={{ span: 24 }}
            layout="horizontal"
            style={{ maxWidth: 800 }}
        >
            <InputService setCategory={setCategory} />

            <InputFields category={category} />
        </Styled.ServiceForm>
    );
};

export default ServiceCreateForm;
