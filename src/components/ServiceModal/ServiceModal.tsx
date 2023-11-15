import * as Styled from './ServiceModal.styled';

import { Button, Divider, Form, FormInstance, Modal, Radio, notification } from 'antd';
import { CancelOption, Config, ModalEnum, ServiceCategory } from '@/utils/enums';
import { useAppDispatch, useAppSelector } from '@/hooks';

import { DATE_FORMAT } from '@/utils/constants';
import ServiceCreateForm from './components/form/ServiceCreateForm';
import {
    cancelSchedule,
    createSchedule,
    getAllPurchased,
    updateSchedule,
} from '@/utils/scheduleAPI';
import moment from 'moment';
import { scheduleSlice } from './components/slice';
import { useEffect, useState } from 'react';
import { ServiceType } from '@/components/ServiceModal/components/data-entry/InputService';
import ViewForm from './components/form/ViewForm';
import dayjs from 'dayjs';
import { ScheduleInfoType } from '../Calendar/Calendar.types';
import { useNavigate, useParams } from 'react-router-dom';
import { ScheduleInfoSlice } from '../Calendar/slice';
import { ServiceConfigType } from '@/pages/Admin/Setting/UnitConfig/components/UnitConfig.type';
import { getServiceConfigByType } from '@/utils/configAPI';

type CreateServiceModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    title: string;
    variant: string;
    scheduleInfo?: ScheduleInfoType;
    setIsReload?: (isReload: boolean) => void;
};

export type FormType = FormInstance;

const ServiceModal = ({
    scheduleInfo,
    isModalOpen,
    title,
    variant,
    setIsModalOpen,
    setIsReload,
}: CreateServiceModalProps) => {
    const dispatch = useAppDispatch();
    const schedule = useAppSelector((state) => state.schedules.schedule);
    const navigate = useNavigate();
    const { scheduleId } = useParams();
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });
    // Form and category state
    const [form] = Form.useForm<FormType>();
    const [category, setCategory] = useState<ServiceCategory>(ServiceCategory.HOURLY_SERVICE);

    // Loading state
    const [loading, setLoading] = useState(false);
    // Message popup

    //All purchased service
    const [serviceList, setServiceList] = useState<ServiceType[]>([]);

    const [cancelForm, setCancelForm] = useState<string>('');
    const [isModalCancelOpen, setIsModalCancelOpen] = useState<boolean>(false);

    const [timeLimit, setTimeLimit] = useState<number>(0);
    const getHourConfig = async () => {
        try {
            const { data }: { data: ServiceConfigType[] } = await getServiceConfigByType(
                Config.FIND_STAFF_MINUTES,
            );
            setTimeLimit(Number.parseInt(data[0].configValue));
        } catch (error: any) {
            console.log(error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        getHourConfig();
    }, []);

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
                endDate = startDate;
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

            if (variant === ModalEnum.CREATE) {
                await createSchedule(scheduleDTO);
                api.success({ message: 'Thành Công', description: 'Đặt lịch thành công' });
            } else {
                if (scheduleInfo) {
                    await updateSchedule(scheduleDTO, scheduleInfo?.scheduleDetail.scheduleId);
                    api.success({ message: 'Thành Công', description: 'Thay đổi lịch thành công' });
                }
            }

            setIsModalOpen(false);
            dispatch(scheduleSlice.actions.resetSchedule());
            setCategory(ServiceCategory.HOURLY_SERVICE);
            localStorage.removeItem('category');
            form.resetFields();

            const { data }: { data: ServiceType[] } = await getAllPurchased();
            setServiceList(data);
        } catch (err: any) {
            api.error({
                message: 'Thất bại',
                description: err.response ? err.response.data : err.message,
            });
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
        if (variant === ModalEnum.VIEW) navigate('/schedule');
        setIsModalOpen(false);
        dispatch(ScheduleInfoSlice.actions.reset());
    };

    const showModal = () => {
        setIsModalCancelOpen(true);
    };

    const handleOk = () => {
        handleCancelSchedule(cancelForm);
        setIsModalCancelOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalCancelOpen(false);
    };

    const handleUpdate = () => {
        const now = dayjs();
        if (scheduleInfo?.scheduleDetail.staffId) return true;
        if (scheduleInfo?.scheduleDetail.startDate) {
            const hours = dayjs(scheduleInfo?.scheduleDetail.startDate).diff(now, 'hour');
            return hours < timeLimit;
        }
        return false;
    };

    const handleCancelSchedule = async (cancelForm: string) => {
        try {
            await cancelSchedule(
                scheduleInfo?.scheduleDetail.scheduleId || Number.parseInt(scheduleId || '0'),
                cancelForm,
            );
            api.success({ message: 'Thành Công', description: 'Đã hủy thành công' });
            setIsModalOpen(false);
            if (setIsReload) setIsReload(true);
        } catch (err: any) {
            api.error({
                message: 'Thất bại',
                description: err.response ? err.response.data : err.message,
            });
        }
    };
    return (
        <Styled.CreateServiceModal
            title={title}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={
                variant === ModalEnum.CREATE
                    ? [
                          <Button key="cancel" onClick={handleCancel}>
                              Quay lại
                          </Button>,
                          <Button
                              key="submit"
                              type="primary"
                              onClick={handleSubmit}
                              loading={loading}
                          >
                              Tạo
                          </Button>,
                      ]
                    : [
                          <Button
                              key="back"
                              disabled={handleUpdate()}
                              onClick={showModal}
                              type="text"
                          >
                              Hủy
                          </Button>,
                          <Button
                              key="submit"
                              onClick={handleSubmit}
                              loading={loading}
                              disabled={handleUpdate()}
                          >
                              Cập nhật
                          </Button>,

                          <Button type="primary" key="cancel" onClick={handleCancel}>
                              Quay lại
                          </Button>,
                      ]
            }
        >
            {contextHolder}
            <Modal
                title="Bạn muốn hủy lịch như thế nào?"
                open={isModalCancelOpen}
                onOk={handleOk}
                onCancel={handleCloseModal}
            >
                <Styled.FormTitle style={{ marginTop: '15px' }}>
                    Bạn có muốn áp dụng thay đổi này cho tất cả các lích khác không?
                </Styled.FormTitle>
                <Radio.Group onChange={(e) => setCancelForm(e.target.value)} value={cancelForm}>
                    <Radio value={CancelOption.THIS_SCHEDULE}>Chỉ hủy lịch này</Radio>
                    <Radio value={CancelOption.THIS_AND_FOLLOWING_SCHEDULE}>
                        Hủy lịch này và các lịch sau
                    </Radio>
                </Radio.Group>
            </Modal>

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

            {variant === ModalEnum.VIEW && (
                <ViewForm
                    form={form}
                    category={category}
                    scheduleInfo={scheduleInfo}
                    setCategory={setCategory}
                    onSubmit={onSubmit}
                    onSubmitFailed={onSubmitFailed}
                    serviceList={serviceList}
                    handleUpdate={handleUpdate}
                    setIsReload={setIsReload}
                />
            )}

            <Divider />
        </Styled.CreateServiceModal>
    );
};

export default ServiceModal;
