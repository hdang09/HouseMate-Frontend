// import React from 'react'
import { Button, Divider, Form, FormInstance } from 'antd';
import * as Styled from './CreateServiceModal.styled';
import { ModalEnum } from '@/utils/enums';
import ServiceCreateForm from './ServiceCreateForm';
import { useAppSelector } from '@/hooks';

type Props = {
    isModalOpen: boolean;
    handleCancel: () => void;
    title: string;
    variant: string;
};

export type FormType = FormInstance;

const CreateServiceModal = ({ isModalOpen, handleCancel, title, variant }: Props) => {
    const [form] = Form.useForm<FormType>();

    const schedule = useAppSelector((state) => state.schedules.schedule);
    const handleSubmit = () => {
        console.log(schedule);

        // form.submit();
    };

    return (
        <Styled.CreateServiceModal
            title={title}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Submit
                </Button>,
            ]}
        >
            <Divider />
            {variant == ModalEnum.CREATE && <ServiceCreateForm form={form} />}
            <Divider />
        </Styled.CreateServiceModal>
    );
};

export default CreateServiceModal;
