import * as Styled from './ServiceModal.styled';

import { Button, Divider, Form, FormInstance, message } from 'antd';
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
import ViewForm from './components/form/ViewForm';
import { ScheduleInfoType } from '../Calendar/Calendar';

type ServiceModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    title: string;
    variant: string;
    scheduleInfo?: ScheduleInfoType;
};

export type FormType = FormInstance;
const MESSAGE_DURATION = 5;

const ServiceModal = ({
    scheduleInfo,
    isModalOpen,
    title,
    variant,
    setIsModalOpen,
}: ServiceModalProps) => {
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
    const onSubmit = async (value: any) => {
        if (variant === ModalEnum.CREATE) {
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
        } else {
            console.log(value);
            setIsModalOpen(false);
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
        <Styled.ServiceModal
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
            {variant === ModalEnum.VIEW && (
                <ViewForm
                    form={form}
                    category={category}
                    scheduleInfo={scheduleInfo}
                    setCategory={setCategory}
                    onSubmit={onSubmit}
                    onSubmitFailed={onSubmitFailed}
                />
            )}
            <Divider />
        </Styled.ServiceModal>
    );
};

export default ServiceModal;
