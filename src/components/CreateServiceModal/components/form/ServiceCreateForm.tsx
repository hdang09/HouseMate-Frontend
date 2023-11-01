import * as Styled from '@/components/CreateServiceModal/CreateServiceModal.styled';

import { FormType } from '@/components/CreateServiceModal/CreateServiceModal';
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
    // const schedule = useAppSelector((state) => state.schedules)
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
            <InputService setCategory={setCategory} resetForm={resetForm} />

            <InputFields category={category} />
        </Styled.ServiceForm>
    );
};

export default ServiceCreateForm;
