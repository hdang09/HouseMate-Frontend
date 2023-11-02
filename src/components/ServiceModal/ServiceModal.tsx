import * as Styled from './ServiceModal.styled';

import { Button, Divider, Form, FormInstance, message } from 'antd';
import { ModalEnum, ServiceCategory } from '@/utils/enums';
import { useAppDispatch, useAppSelector } from '@/hooks';

import { DATE_FORMAT } from '@/utils/constants';
import ServiceCreateForm from './components/form/ServiceCreateForm';
import { createSchedule, getAllPurchased } from '@/utils/scheduleAPI';
import moment from 'moment';
import { scheduleSlice } from './components/slice';
import { useState } from 'react';
import { ServiceType } from '@/components/ServiceModal/components/data-entry/InputService';

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

    //All purchased service
    const [serviceList, setServiceList] = useState<ServiceType[]>([]);

    //TODO: Validate form
    const onSubmit = async () => {
        try {
            setLoading(true);

            let startDate: string;
            let endDate: string;
            let quantity = schedule.quantity || 0;
            if (schedule.timeRanges?.length) {
                startDate = schedule.date + ' ' + schedule.timeRanges[0];
                endDate = schedule.date + ' ' + schedule.timeRanges[1];
                quantity = moment(endDate, DATE_FORMAT).diff(
                    moment(startDate, DATE_FORMAT),
                    'hours',
                );
            } else if (schedule.pickUpDate && schedule.receiveDate) {
                startDate = schedule.pickUpDate + ' ' + schedule.time;
                endDate = schedule.receiveDate + ' ' + schedule.receivedTime;
            } else {
                startDate = schedule.date + ' ' + schedule.time;
                endDate = moment(startDate, DATE_FORMAT).add(1, 'hour').format(DATE_FORMAT); // Default add 1 hour to DELIVERY_SERVICE
            }

            const scheduleDTO = {
                serviceId: schedule.serviceId,
                groupType: schedule.groupType,
                cycle: schedule.cycle,
                note: schedule.note,
                typeId: schedule.typeId,
                quantityRetrieve: quantity,
                userUsageId: schedule.userUsageId,
                startDate,
                endDate,
            };

            const res = await createSchedule(scheduleDTO);

            messageApi.success(res.data, MESSAGE_DURATION);
            setIsModalOpen(false);
            dispatch(scheduleSlice.actions.resetSchedule());
            setCategory(ServiceCategory.HOURLY_SERVICE);
            localStorage.removeItem('category');
            form.resetFields();

            const { data }: { data: ServiceType[] } = await getAllPurchased();
            setServiceList(data);
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
        form.resetFields();
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
                    setServiceList={setServiceList}
                    serviceList={serviceList}
                />
            )}

            <Divider />
        </Styled.CreateServiceModal>
    );
};

export default CreateServiceModal;
