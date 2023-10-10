import { fields } from '@/components/CreateServiceModal/CreateService.fields';
import InputService from '@/components/CreateServiceModal/components/data-entry/InputService';

import * as Styled from '@/components/CreateServiceModal/CreateServiceModal.styled';
import { FormType } from '@/components/CreateServiceModal/CreateServiceModal';

type ServiceCreateFormProps = {
    form: FormType;
    service: string;
    setService: (service: string) => void;
};

const ServiceCreateForm = ({ form, service, setService }: ServiceCreateFormProps) => {
    return (
        <Styled.ServiceForm
            form={form}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            style={{ maxWidth: 800 }}
        >
            <InputService setService={setService} />

            {/* render another fields based on service name */}
            {fields.service[service]?.fieldIds?.map((item, index) => {
                return <div key={index}>{fields.field[item].input}</div>;
            })}
        </Styled.ServiceForm>
    );
};

export default ServiceCreateForm;
