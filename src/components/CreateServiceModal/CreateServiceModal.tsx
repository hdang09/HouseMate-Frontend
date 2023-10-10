import { Button, Divider, Form, FormInstance } from 'antd';
import * as Styled from './CreateServiceModal.styled';
import { ModalEnum } from '@/utils/enums';
import ServiceCreateForm from './components/form/ServiceCreateForm';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { scheduleSlice } from './components/slice';
import { useState } from 'react';

type CreateServiceModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    title: string;
    variant: string;
};

export type FormType = FormInstance;

const CreateServiceModal = ({
    isModalOpen,
    title,
    variant,
    setIsModalOpen,
}: CreateServiceModalProps) => {
    const dispatch = useAppDispatch();
    const schedule = useAppSelector((state) => state.schedules.schedule);

    const [form] = Form.useForm<FormType>();
    const [service, setService] = useState('cleaning-house');

    const handleSubmit = () => {
        console.log(schedule);
        setIsModalOpen(false);
        dispatch(scheduleSlice.actions.resetSchedule());
        setService('cleaning-house');
        localStorage.removeItem('serviceName');
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        dispatch(scheduleSlice.actions.resetSchedule());
        setService('cleaning-house');
        localStorage.removeItem('serviceName');
        form.resetFields();
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
            {variant === ModalEnum.CREATE && (
                <ServiceCreateForm form={form} service={service} setService={setService} />
            )}
            <Divider />
        </Styled.CreateServiceModal>
    );
};

export default CreateServiceModal;
