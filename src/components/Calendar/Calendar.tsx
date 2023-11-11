import 'react-big-calendar/lib/css/react-big-calendar.css';

import * as Styled from './Calendar.styled';

import { Col, Drawer, Row, Spin } from 'antd';
import EventType, { ReportSchedule, ScheduleDetail, ScheduleInfoType } from './Calendar.types';
import {
    getEvents,
    getReportScheduleDetail,
    getScheduleDetail,
    getStaffEventsById,
} from '@/utils/scheduleAPI';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AiOutlineMenu } from 'react-icons/ai';
import Event from './Event';
import StatusPanel from './StatusPanel';
import { eventStyleGetter } from './Calendar.functions';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useMediaQuery } from 'styled-breakpoints/use-media-query';
import { useTheme } from 'styled-components';
import ServiceModal from '../ServiceModal';
import { ModalEnum, Status } from '@/utils/enums';
import { ScheduleInfoSlice } from './slice';

const localizer = momentLocalizer(moment);

const Calendar = ({ admin = false }: { admin?: boolean }) => {
    // Get staff ID
    const { staffId } = useParams();
    const navigate = useNavigate();
    // Skeleton
    const [loading, setLoading] = useState(false);

    const [events, setEvents] = useState<EventType[]>();
    const [scheduleDetail, setScheduleDetail] = useState<ScheduleInfoType>();

    const dispatch = useAppDispatch();
    const scheduleServiceId = useAppSelector((state) => state.schedules.serviceId);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [event, setEvent] = useState<EventType>();

    const [isReload, setIsReload] = useState<boolean>(false);

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
        if (isReload) {
            getAllEvents();
            setIsReload(false);
        }
    }, [scheduleServiceId, isReload]);

    const getScheduleInfo = async (scheduleId: number) => {
        try {
            const { data }: { data: ScheduleDetail } = await getScheduleDetail(scheduleId);

            if (data.onTask && data.status != Status.CANCEL) {
                const res = await getReportScheduleDetail(data.scheduleId);
                const report: ReportSchedule = res.data;
                const scheduleObj: ScheduleInfoType = {
                    scheduleDetail: {
                        serviceName: data.serviceName,
                        customerId: data.customerId,
                        cycle: data.cycle,
                        endDate: data.endDate,
                        note: data.note,
                        onTask: data.onTask,
                        parentScheduleId: data.parentScheduleId,
                        phone: data.phone,
                        quantityRetrieve: data.quantityRetrieve,
                        scheduleId: data.scheduleId,
                        serviceId: data.serviceId,
                        serviceTypeId: data.serviceTypeId,
                        staff: data.staff,
                        staffId: data.staffId,
                        startDate: data.startDate,
                        status: data.status,
                        type: data.type,
                        usages: data.usages,
                        userUsageId: data.userUsageId,
                        currentUsage: data.currentUsage,
                        groupType: data.groupType,
                    },
                    staff: report.staff,
                    customer: report.customer,
                    taskReportList: report.taskReportList,
                    feedback: report.feedback,
                };
                setScheduleDetail(scheduleObj);
                dispatch(ScheduleInfoSlice.actions.setScheduleInfo(scheduleObj));
            } else {
                const scheduleObj: ScheduleInfoType = {
                    scheduleDetail: {
                        serviceName: data.serviceName,
                        customerId: data.customerId,
                        cycle: data.cycle,
                        endDate: data.endDate,
                        note: data.note,
                        onTask: data.onTask,
                        parentScheduleId: data.parentScheduleId,
                        phone: data.phone,
                        quantityRetrieve: data.quantityRetrieve,
                        scheduleId: data.scheduleId,
                        serviceId: data.serviceId,
                        serviceTypeId: data.serviceTypeId,
                        staff: data.staff,
                        staffId: data.staffId,
                        startDate: data.startDate,
                        status: data.status,
                        type: data.type,
                        usages: data.usages,
                        userUsageId: data.userUsageId,
                        currentUsage: data.currentUsage,
                        groupType: data.groupType,
                    },
                    staff: null,
                    customer: null,
                    taskReportList: [],
                    feedback: null,
                };
                setScheduleDetail(scheduleObj);
                dispatch(ScheduleInfoSlice.actions.setScheduleInfo(scheduleObj));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectSchedule = async (ev: EventType) => {
        navigate(`/schedule/${ev.scheduleId}`);
        setIsModalOpen(true);
        getScheduleInfo(ev.scheduleId);
        setEvent(ev);
    };

    // Handle responsive
    const isUpXl = admin ? false : useMediaQuery(useTheme()?.breakpoints.up('xl'));

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
                <Col xs={0} md={24} xl={admin ? 24 : 4}>
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
                    <Styled.CalendarWrapper $admin={admin}>
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
                                max={new Date(0, 0, 0, 19, 0, 0)}
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
                    setIsReload={setIsReload}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    title={event.title}
                    variant={ModalEnum.VIEW}
                    scheduleInfo={scheduleDetail}
                />
            )}
        </>
    );
};

export default Calendar;
