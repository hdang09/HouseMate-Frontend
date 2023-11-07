import 'react-big-calendar/lib/css/react-big-calendar.css';

import * as Styled from './Calendar.styled';

import { Col, Drawer, Row, Spin } from 'antd';
import {
    getEvents,
    getReportScheduleDetail,
    getScheduleDetail,
    getStaffEventsById,
} from '@/utils/scheduleAPI';
import { useEffect, useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import Event from './Event';
import EventType, { ReportSchedule, ScheduleDetail, ScheduleInfoType } from './Calendar.types';
import StatusPanel from './StatusPanel';
import { eventStyleGetter } from './Calendar.functions';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import { useAppSelector } from '@/hooks';
import { useMediaQuery } from 'styled-breakpoints/use-media-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import ServiceModal from '../ServiceModal';
import { Status } from '@/utils/enums';

const localizer = momentLocalizer(moment);

const Calendar = () => {
    // Get staff ID
    const { staffId } = useParams();
    const navigate = useNavigate();
    // Skeleton
    const [loading, setLoading] = useState(false);

    const [events, setEvents] = useState<EventType[]>();
    const [scheduleDetail, setScheduleDetail] = useState<ScheduleInfoType>();

    const scheduleServiceId = useAppSelector((state) => state.schedules.serviceId);
    // Fetch event API
    useEffect(() => {
        const getAllEvents = async () => {
            try {
                // Show skeleton
                setLoading(true);

                // Fetch API
                const { data } = staffId ? await getStaffEventsById(+staffId) : await getEvents();

                // Store response
                setEvents(
                    data.map((item: EventType) => ({
                        ...item,
                        start: new Date(item.start),
                        end: new Date(item.end),
                    })),
                );
            } finally {
                setLoading(false);
            }
        };

        if (events === undefined || scheduleServiceId === 0) getAllEvents();
    }, [scheduleServiceId]);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [event, setEvent] = useState<EventType>();

    const handleSelectSchedule = async (ev: EventType) => {
        navigate(`/schedule/${ev.scheduleId}`);
        setIsModalOpen(true);
        try {
            const { data }: { data: ScheduleDetail } = await getScheduleDetail(ev.scheduleId);
            console.log(data);

            if (data.onTask && data.status != Status.CANCEL) {
                const res = await getReportScheduleDetail(data.scheduleId);
                const report: ReportSchedule = res.data;
                const usageObj =
                    data.usages.find((usage) => usage.userUsageId === data.userUsageId) ||
                    data.usages[0];

                setScheduleDetail({
                    service: report.service,
                    scheduleDetail: {
                        ...data,
                        usage: usageObj,
                    },
                    staff: report.staff,
                    customer: report.customer,
                    taskReportList: report.taskReportList,
                    feedback: report.feedback,
                });
            }
        } catch (error) {
            console.log(error);
        }
        setEvent(ev);
    };

    // Handle responsive
    const isUpXl = useMediaQuery(useTheme()?.breakpoints.up('xl'));

    // Drawer
    const [openDrawer, setOpenDrawer] = useState(false);

    const showDrawer = () => {
        setOpenDrawer(true);
    };

    const onClose = () => {
        setOpenDrawer(false);
    };

    return (
        <>
            <Styled.ScheduleTitle level={3}>Lịch của bạn</Styled.ScheduleTitle>

            <Row gutter={[24, 24]}>
                <Col xs={0} md={24} xl={4}>
                    <StatusPanel
                        direction={isUpXl ? 'vertical' : 'horizontal'}
                        align={isUpXl ? 'start' : 'center'}
                    />
                </Col>

                <Col xs={24} md={0}>
                    <Styled.PanelWrapper>
                        <AiOutlineMenu size={24} onClick={showDrawer} height="auto" />
                        <Styled.StatusPanelText>Thanh trạng thái</Styled.StatusPanelText>
                    </Styled.PanelWrapper>

                    <Drawer
                        title="Thanh trạng thái"
                        placement="left"
                        onClose={onClose}
                        open={openDrawer}
                    >
                        <StatusPanel direction="vertical" align="start" />
                    </Drawer>
                </Col>

                <Col xs={24} xl={20}>
                    <Styled.CalendarWrapper>
                        <Spin size="large" spinning={loading} tip="Vui lòng đợi...">
                            <Styled.Calendar
                                localizer={localizer}
                                events={events}
                                eventPropGetter={eventStyleGetter}
                                components={{
                                    header: ({ date }) => moment(date).format('ddd (DD/MM)'),
                                    event: Event,
                                }}
                                // TODO: Get working hours from backend
                                min={new Date(0, 0, 0, 7, 0, 0)}
                                max={new Date(0, 0, 0, 20, 0, 0)}
                                length={50}
                                onSelectEvent={handleSelectSchedule}
                                enableAutoScroll
                                defaultView="week"
                                views={['week', 'day']}
                            />
                        </Spin>
                    </Styled.CalendarWrapper>
                </Col>
            </Row>

            {event && (
                <ServiceModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    title={event.title}
                    variant="View"
                    scheduleInfo={scheduleDetail}
                />
            )}

            {/* {event && (
                <Modal
                    title={event.title}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>
                        {JSON.stringify(event.start)} - {JSON.stringify(event.end)}
                    </p>
                    <p>Status: {event.status}</p>
                    <p>Staff: {event.userName}</p>
                    <p>Phone: {event.phone}</p>
                </Modal>
            )} */}
        </>
    );
};

export default Calendar;
