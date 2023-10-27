import * as Styled from '@/components/CreateServiceModal/ServiceModal.styled';

import { FormType } from '@/components/CreateServiceModal/ServiceModal';
import InputFields from '@/components/CreateServiceModal/CreateService.fields';
import InputService from '@/components/CreateServiceModal/components/data-entry/InputService';
import { ServiceCategory, Status } from '@/utils/enums';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { ScheduleInfoType } from '@/components/Calendar/Calendar';
import { Col, Image, Rate, Row, Space } from 'antd';
import Progress from '../progress/Progress';

type ServiceCreateFormProps = {
    form: FormType;
    category: ServiceCategory;
    scheduleInfo?: ScheduleInfoType;
    setCategory: (service: ServiceCategory) => void;
    onSubmit: (value: any) => void;
    onSubmitFailed: (error: any) => void;
};

const ViewForm = ({
    form,
    category,
    scheduleInfo,
    setCategory,
    onSubmit,
    onSubmitFailed,
}: ServiceCreateFormProps) => {
    useEffect(() => {
        // avoid date range get undefine value. Solve TypeError: date.locale error
        form.setFieldsValue({
            dateRange: dayjs(),
        });
    }, []);

    const initialValues = {
        service: scheduleInfo?.titleName,
        Date: dayjs(scheduleInfo?.date),
        timeRange: dayjs(scheduleInfo?.timeRanges),
        cycle: scheduleInfo?.cycle,
        note: scheduleInfo?.note,
        dateRange: [dayjs(scheduleInfo?.pickUpDate), dayjs(scheduleInfo?.receiveDate)],
        time: dayjs(scheduleInfo?.date),
        type: scheduleInfo?.type,
        quantity: scheduleInfo?.quantity,
        receivedTime: dayjs(scheduleInfo?.receiveTime),
    };

    console.log(dayjs(scheduleInfo?.date));

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
                    <Col span={6}>Status:</Col>
                    <Col span={8}>
                        <Styled.StatusTag $status={(scheduleInfo?.scheduleStatus as Status) || ''}>
                            {scheduleInfo?.scheduleStatus}
                        </Styled.StatusTag>
                    </Col>
                </Row>

                <InputService setCategory={setCategory} />

                <InputFields category={scheduleInfo?.groupType || category} />
            </Styled.ServiceForm>
            <Styled.FormTitle>Thông tin nhân viên</Styled.FormTitle>
            <Row justify={'space-between'}>
                <Col>
                    <Styled.FormParagraph>Tên: {scheduleInfo?.staffName}</Styled.FormParagraph>
                    <Styled.FormParagraph>SĐT: {scheduleInfo?.phoneNumber}</Styled.FormParagraph>
                    <Space size={16} align="center">
                        <Styled.FormText>Đánh giá:</Styled.FormText>
                        <Rate
                            count={5}
                            defaultValue={Math.round(scheduleInfo?.rating || 0) || 5}
                            allowHalf
                            disabled
                        />
                        <Styled.FormText>{scheduleInfo?.rating.toFixed(1)}</Styled.FormText>
                    </Space>
                </Col>
                <Col>
                    <Styled.Avatar width={150} height={120} src={scheduleInfo?.avatar} />
                </Col>
            </Row>
            <Progress report={scheduleInfo?.report} />
        </>
    );
};

export default ViewForm;
