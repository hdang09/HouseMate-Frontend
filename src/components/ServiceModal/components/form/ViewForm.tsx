import * as Styled from '@/components/ServiceModal/ServiceModal.styled';

import { FormType } from '@/components/ServiceModal/ServiceModal';
import InputFields from '@/components/ServiceModal/Service.fields';
import InputService, {
    ServiceType,
} from '@/components/ServiceModal/components/data-entry/InputService';
import { ModalEnum, ServiceCategory, Status, StatusLabel } from '@/utils/enums';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Col, Rate, Row, Space } from 'antd';
import Progress from '../progress/Progress';
import { ScheduleInfoType } from '@/components/Calendar/Calendar.types';
import fallbackImg from '@/assets/images/fallback-img.png';
import { useAppDispatch } from '@/hooks';
import { scheduleSlice } from '../slice';
import { Dayjs } from 'dayjs';

type ServiceCreateFormProps = {
    form: FormType;
    category: ServiceCategory;
    scheduleInfo?: ScheduleInfoType;
    setCategory: (service: ServiceCategory) => void;
    onSubmit: (value: any) => void;
    onSubmitFailed: (error: any) => void;
    serviceList: ServiceType[];
    handleUpdate: () => boolean;
    setIsReload?: (isReload: boolean) => void;
};

type InitialValuesType = {
    service: string;
    Date: Dayjs;
    timeRange: any;
    dateRange: any;
    cycle: string;
    note: string;
    receivedTime: Dayjs;
    time: Dayjs;
    type: number;
    quantity: number;
    usage: string;
};

const ViewForm = ({
    form,
    category,
    scheduleInfo,
    setCategory,
    onSubmit,
    onSubmitFailed,
    serviceList,
    handleUpdate,
    setIsReload,
}: ServiceCreateFormProps) => {
    useEffect(() => {
        // avoid date range get undefine value. Solve TypeError: date.locale error
        form.setFieldsValue({
            dateRange: dayjs(),
        });
        if (scheduleInfo) {
            dispatch(scheduleSlice.actions.setAllSchedule(scheduleInfo));
            const initialValues: InitialValuesType = {
                service: scheduleInfo?.scheduleDetail.serviceName,
                Date: dayjs(scheduleInfo?.scheduleDetail.startDate),
                timeRange: [
                    dayjs(scheduleInfo?.scheduleDetail.startDate),
                    dayjs(scheduleInfo?.scheduleDetail.endDate),
                ],
                cycle: scheduleInfo?.scheduleDetail.cycle,
                note: scheduleInfo?.scheduleDetail.note,
                dateRange: [
                    dayjs(scheduleInfo?.scheduleDetail.startDate),
                    dayjs(scheduleInfo?.scheduleDetail.endDate),
                ],
                time: dayjs(scheduleInfo?.scheduleDetail.startDate),
                type: scheduleInfo?.scheduleDetail.serviceTypeId,
                usage: `Lượng còn lại: ${scheduleInfo?.scheduleDetail.currentUsage?.remaining}/${
                    scheduleInfo?.scheduleDetail.currentUsage?.total
                } ${scheduleInfo?.scheduleDetail.currentUsage?.service?.titleName} (
                        ${dayjs(scheduleInfo?.scheduleDetail?.currentUsage?.startDate).format(
                            'DD/MM/YYYY',
                        )} -
                        ${dayjs(scheduleInfo?.scheduleDetail.currentUsage?.endDate).format(
                            'DD/MM/YYYY',
                        )})`,
                quantity: scheduleInfo?.scheduleDetail.quantityRetrieve,
                receivedTime: dayjs(scheduleInfo?.scheduleDetail.endDate),
            };
            form.setFieldsValue(initialValues);
        }
    }, [scheduleInfo]);
    const dispatch = useAppDispatch();
    return (
        <>
            <Styled.ServiceForm
                form={form}
                onFinish={onSubmit}
                onFinishFailed={onSubmitFailed}
                wrapperCol={{ span: 12 }}
                layout="horizontal"
                disabled={handleUpdate()}
                style={{ maxWidth: 800 }}
            >
                <Row>
                    <Col span={6} style={{ marginBottom: '18px' }}>
                        Tình trạng:
                    </Col>
                    <Col span={8}>
                        <Styled.StatusTag
                            $status={(scheduleInfo?.scheduleDetail.status as Status) || ''}
                        >
                            {StatusLabel[
                                scheduleInfo?.scheduleDetail.status as keyof typeof StatusLabel
                            ] || StatusLabel.PROCESSING}
                        </Styled.StatusTag>
                    </Col>
                </Row>

                <InputService
                    setCategory={setCategory}
                    serviceList={serviceList}
                    variant={ModalEnum.VIEW}
                />

                <InputFields
                    category={scheduleInfo?.scheduleDetail.groupType || category}
                    variant={ModalEnum.VIEW}
                />
            </Styled.ServiceForm>

            <Styled.FormTitle>Thông tin nhân viên</Styled.FormTitle>

            <Row justify={'space-between'} style={{ marginBottom: '30px' }}>
                <Col>
                    <Styled.FormText>
                        Tên:{'  '}
                        {scheduleInfo?.staff?.staffInfo.fullName || <span>Chưa có nhân viên</span>}
                    </Styled.FormText>

                    <Styled.FormText>
                        SĐT:{'  '}
                        {scheduleInfo?.staff?.staffInfo.phoneNumber.replace(
                            /(\d{4})(\d{3})(\d{3})/,
                            '$1 $2 $3',
                        ) || <span>Chưa có nhân viên</span>}
                    </Styled.FormText>

                    <Space size={16} align="center" style={{ marginBottom: '0.3em' }}>
                        <Styled.FormText>Đánh giá:</Styled.FormText>
                        <Rate
                            defaultValue={scheduleInfo ? scheduleInfo.staff?.avgRating : 0}
                            allowHalf
                            disabled
                        />
                        <Styled.FormText>
                            {scheduleInfo?.staff?.avgRating.toFixed(1)}
                        </Styled.FormText>
                    </Space>

                    <Styled.FormText>
                        Điểm tin cậy:{'  '}
                        {scheduleInfo?.staff?.proficiencyScore || <span>Chưa có nhân viên</span>}
                    </Styled.FormText>
                </Col>
                <Col>
                    <Styled.Avatar
                        width={150}
                        height={120}
                        src={scheduleInfo?.staff?.staffInfo.avatar || fallbackImg}
                        fallback={fallbackImg}
                    />
                </Col>
            </Row>

            <Progress
                report={scheduleInfo?.taskReportList}
                feedback={scheduleInfo?.feedback}
                serviceId={scheduleInfo?.scheduleDetail.serviceId}
                service={scheduleInfo?.scheduleDetail}
                setIsReload={setIsReload}
            />
        </>
    );
};

export default ViewForm;
