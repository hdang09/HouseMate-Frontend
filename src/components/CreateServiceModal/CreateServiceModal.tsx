import * as Styled from './CreateServiceModal.styled';

import { Button, Divider, Form, FormInstance, Spin, message } from 'antd';
import { ModalEnum, ServiceCategory } from '@/utils/enums';
import {
    createDeliverySchedule,
    createHourlySchedule,
    createReturnSchedule,
} from '@/utils/scheduleAPI';
import { useAppDispatch, useAppSelector } from '@/hooks';

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
const MESSAGE_DURATION = 5;

const CreateServiceModal = ({
    isModalOpen,
    title,
    variant,
    setIsModalOpen,
}: CreateServiceModalProps) => {
    const dispatch = useAppDispatch();
    const schedule = useAppSelector((state) => state.schedules.schedule);

    // Form and category state
    const [form] = Form.useForm<FormType>();
    const [category, setCategory] = useState<ServiceCategory>(ServiceCategory.HOURLY_SERVICE);

    // Loading state
    const [loading, setLoading] = useState(false);

    // Message popup
    const [messageApi, contextHolder] = message.useMessage();

    //TODO: Validate form
    const onSubmit = async () => {
        try {
            setLoading(true);

            let res: any;
            if (category === ServiceCategory.HOURLY_SERVICE) {
                res = await createHourlySchedule(schedule);
            } else if (category === ServiceCategory.DELIVERY_SERVICE) {
                res = await createDeliverySchedule(schedule);
            } else if (category === ServiceCategory.RETURN_SERVICE) {
                res = await createReturnSchedule(schedule);
            }

            messageApi.success(res.data, MESSAGE_DURATION);
            setIsModalOpen(false);
            dispatch(scheduleSlice.actions.resetSchedule());
            setCategory(ServiceCategory.HOURLY_SERVICE);
            localStorage.removeItem('category');
            form.resetFields();
        } catch (err: any) {
            messageApi.error(err.response ? err.response.data : err.message, MESSAGE_DURATION);
        } finally {
            setLoading(false);
        }
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
                <Button key="submit" type="primary" onClick={handleSubmit} loading={loading}>
                    Create
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
