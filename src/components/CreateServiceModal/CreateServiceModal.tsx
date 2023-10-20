import * as Styled from './CreateServiceModal.styled';

import { Button, Divider, Form, FormInstance, message } from 'antd';
import {
    createDeliverySchedule,
    createHourlySchedule,
    createReturnSchedule,
} from '@/utils/scheduleAPI';
import { useAppDispatch, useAppSelector } from '@/hooks';

import { ModalEnum } from '@/utils/enums';
import ServiceCreateForm from './components/form/ServiceCreateForm';
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
    const [category, setCategory] = useState('HOURLY_SERVICE');

    // Message popup
    const [messageApi, contextHolder] = message.useMessage();

    //TODO: Validate form
    const handleSuccess = () => {
        const createSchedule = async () => {
            try {
                let res: any;
                if (category === 'HOURLY_SERVICE') {
                    res = await createHourlySchedule(schedule);
                } else if (category === 'DELIVERY_SERVICE') {
                    res = await createDeliverySchedule(schedule);
                } else if (category === 'RETURN_SERVICE') {
                    res = await createReturnSchedule(schedule);
                }
                messageApi.success(res.data);
                setIsModalOpen(false);
                dispatch(scheduleSlice.actions.resetSchedule());
                setCategory('HOURLY_SERVICE');
                localStorage.removeItem('category');
                form.resetFields();
            } catch (err: any) {
                messageApi.error(err.response ? err.response.data : err.message);
            }
        };
        createSchedule();
    };

    const onSubmit = () => {
        handleSuccess();
    };

    const onSubmitFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleSubmit = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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
            {contextHolder}
            <Divider />
            {variant === ModalEnum.CREATE && (
                <ServiceCreateForm
                    form={form}
                    category={category}
                    setCategory={setCategory}
                    onSubmit={onSubmit}
                    onSubmitFailed={onSubmitFailed}
                />
            )}
            <Divider />
        </Styled.CreateServiceModal>
    );
};

export default CreateServiceModal;
