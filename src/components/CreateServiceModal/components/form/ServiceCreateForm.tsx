import InputFields from '@/components/CreateServiceModal/CreateService.fields';
import InputService from '@/components/CreateServiceModal/components/data-entry/InputService';

import * as Styled from '@/components/CreateServiceModal/CreateServiceModal.styled';
import { FormType } from '@/components/CreateServiceModal/CreateServiceModal';

type ServiceCreateFormProps = {
    form: FormType;
    category: string;
    setCategory: (service: string) => void;
};

const ServiceCreateForm = ({ form, category, setCategory }: ServiceCreateFormProps) => {
    return (
        <Styled.ServiceForm
            form={form}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            style={{ maxWidth: 800 }}
        >
            <InputService setCategory={setCategory} />

            <InputFields category={category} />
        </Styled.ServiceForm>
    );
};

export default ServiceCreateForm;
