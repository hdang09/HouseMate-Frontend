import * as Styled from '@/components/ServiceModal/ServiceModal.styled';

import { FormType } from '@/components/ServiceModal/ServiceModal';
import InputFields from '@/components/ServiceModal/Service.fields';
import InputService, {
    ServiceType,
} from '@/components/ServiceModal/components/data-entry/InputService';
import { ServiceCategory, Status } from '@/utils/enums';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Col, Rate, Row, Space } from 'antd';
import Progress from '../progress/Progress';
import { ScheduleInfoType } from '@/components/Calendar/Calendar.types';

type ServiceCreateFormProps = {
    form: FormType;
    category: ServiceCategory;
    scheduleInfo?: ScheduleInfoType;
    setCategory: (service: ServiceCategory) => void;
    onSubmit: (value: any) => void;
    onSubmitFailed: (error: any) => void;
    serviceList: ServiceType[];
};

const ViewForm = ({
    form,
    category,
    scheduleInfo,
    setCategory,
    onSubmit,
    onSubmitFailed,
    serviceList,
}: ServiceCreateFormProps) => {
    useEffect(() => {
        // avoid date range get undefine value. Solve TypeError: date.locale error
        form.setFieldsValue({
            dateRange: dayjs(),
        });
    }, []);

    const initialValues = {
        service: scheduleInfo?.titleName,
        Date: dayjs(scheduleInfo?.startDate),
        timeRange: [dayjs(scheduleInfo?.startDate), dayjs(scheduleInfo?.endDate)],
        cycle: scheduleInfo?.cycle,
        note: scheduleInfo?.note,
        dateRange: [dayjs(scheduleInfo?.startDate), dayjs(scheduleInfo?.endDate)],
        time: dayjs(scheduleInfo?.startDate),
        type: scheduleInfo?.typeName,
        usage: scheduleInfo?.usage.titleName,
        quantity: scheduleInfo?.quantityRetrieve,
        receivedTime: dayjs(scheduleInfo?.endDate),
    };

    return (
        <>
            <Styled.ServiceForm
                form={form}
                onFinish={onSubmit}
                onFinishFailed={onSubmitFailed}
                initialValues={initialValues}
                wrapperCol={{ span: 12 }}
                layout="horizontal"
                disabled
                style={{ maxWidth: 800 }}
            >
                <Row>
                    <Col span={6} style={{ marginBottom: '18px' }}>
                        Tình trạng:
                    </Col>
                    <Col span={8}>
                        <Styled.StatusTag $status={(scheduleInfo?.status as Status) || ''}>
                            {scheduleInfo?.status}
                        </Styled.StatusTag>
                    </Col>
                </Row>

                <InputService setCategory={setCategory} serviceList={serviceList} />

                <InputFields category={scheduleInfo?.groupType || category} />
            </Styled.ServiceForm>
            <Styled.FormTitle>Thông tin nhân viên</Styled.FormTitle>
            <Row justify={'space-between'} style={{ marginBottom: '30px' }}>
                <Col>
                    <Styled.FormParagraph>
                        Tên: {scheduleInfo?.staff.staffInfo.fullName}
                    </Styled.FormParagraph>
                    <Styled.FormParagraph>
                        SĐT: {scheduleInfo?.staff.staffInfo.phoneNumber}
                    </Styled.FormParagraph>

                    <Space size={16} align="center" style={{ marginBottom: '0.5em' }}>
                        <Styled.FormText>Đánh giá:</Styled.FormText>
                        <Rate
                            defaultValue={scheduleInfo ? scheduleInfo.staff.avgRating : 0}
                            allowHalf
                            disabled
                        />
                        <Styled.FormText>
                            {scheduleInfo?.staff.avgRating.toFixed(1)}
                        </Styled.FormText>
                    </Space>
                    <Styled.FormParagraph>
                        Điểm tin cậy: {scheduleInfo?.staff.profiencyScore}
                    </Styled.FormParagraph>
                </Col>
                <Col>
                    <Styled.Avatar
                        width={150}
                        height={120}
                        src={scheduleInfo?.staff.staffInfo.avatar}
                    />
                </Col>
            </Row>
            <Progress
                report={scheduleInfo?.taskReportList}
                feedback={scheduleInfo?.feedback}
                serviceId={scheduleInfo?.serviceId}
            />
        </>
    );
};

export default ViewForm;
