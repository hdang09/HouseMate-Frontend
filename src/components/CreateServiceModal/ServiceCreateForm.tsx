import { FormType } from './CreateServiceModal';

import { useState } from 'react';
import { fields } from './CreateService.fields';
import InputService from './components/data-entry/InputService';

import * as Styled from './CreateServiceModal.styled';
type ServiceCreateFormProps = {
    form: FormType;
};

const ServiceCreateForm = ({ form }: ServiceCreateFormProps) => {
    const [service, setService] = useState('cleaning-house');

    return (
        <Styled.ServiceForm
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={(value: any) => console.log(value)}
        >
            <InputService setService={setService} />

            {fields.service[service].fieldIds?.map((item, index) => {
                return <>{fields.field[item].input}</>;
            })}
        </Styled.ServiceForm>
    );
};

export default ServiceCreateForm;
