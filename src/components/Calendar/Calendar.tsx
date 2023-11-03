import 'react-big-calendar/lib/css/react-big-calendar.css';

import * as Styled from './Calendar.styled';

import { Col, Drawer, Modal, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import Event from './Event';
import EventType from './Calendar.types';
import StatusPanel from './StatusPanel';
import { eventStyleGetter } from './Calendar.functions';
import { getCustomerEvents } from '@/utils/scheduleAPI';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import { useAppSelector } from '@/hooks';
import { useMediaQuery } from 'styled-breakpoints/use-media-query';
import { useTheme } from 'styled-components';
import ServiceModal from '../ServiceModal';

interface FeedbackType {
    userName: string;
    rating: number;
    content: string;
}

export interface ReportType {
    status: string;
    arrivedTime: string;
    doingTime: string;
    completedTime: string;
    images: {
        beforeWork: string[];
        afterWork: string[];
    };
    feedback: FeedbackType;
}

export type ScheduleInfoType = {
    serviceId: number;
    titleName: string;
    groupType: string;
    date?: string;
    timeRanges?: any;
    cycle: string;
    note: string;
    pickUpDate?: string;
    pickUpTime?: string;
    receiveDate?: string;
    receiveTime?: string;
    type?: string;
    quantity?: number;
    scheduleStatus: string;
    staffName: string;
    phoneNumber: string;
    rating: number;
    avatar: string;
    report: ReportType;
};

const localizer = momentLocalizer(moment);

const Calendar = () => {
    // Skeleton
    const [loading, setLoading] = useState(false);

    const [events, setEvents] = useState();

    const scheduleServiceId = useAppSelector((state) => state.schedules.serviceId);

    // Fetch event API
    useEffect(() => {
        const getAllEvents = async () => {
            try {
                // Show skeleton
                setLoading(true);

                // Fetch API
                const { data } = await getCustomerEvents();

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
        getAllEvents();
    }, [scheduleServiceId]);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [event, setEvent] = useState<EventType>();

    const showModal = (ev: EventType) => {
        setIsModalOpen(true);
        setEvent(ev);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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

    const scheduleInfo: ScheduleInfoType = {
        serviceId: 1,
        titleName: event?.title || 'Tên service',
        groupType: 'DELIVERY_SERVICE',
        date: '10/10/2023 8:00',
        cycle: 'Chỉ 1 lần',
        note: "Gọi sớm hơn 15'",
        type: 'Bidrico',
        quantity: 3,
        scheduleStatus: 'DONE',
        staffName: 'Dương Hoàng Nam',
        phoneNumber: '0123456789',
        rating: 4.9,
        avatar: 'https://scontent.fsgn5-10.fna.fbcdn.net/v/t1.6435-9/118159693_777173249776031_8152831464517047066_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=73878a&_nc_ohc=ufiWti9k8lcAX8hNm_l&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfCv16Th6YpHmK3RoZd8OzPLKBWu0fYOcLnCK64Ap_yoow&oe=6562C577',
        report: {
            status: 'complete',
            arrivedTime: '2023-10-28 07:00:00',
            doingTime: '2023-10-28 07:00:00',
            completedTime: '2023-10-28 07:00:00',
            images: {
                beforeWork: [
                    'https://aquafinawater.net/wp-content/uploads/2021/09/dai-ly-giao-nuoc-tan-nha-tai-tphcm.jpg',
                    'https://vietnamwater.net/wp-content/uploads/2019/03/Untitled-S1.jpg',
                ],
                afterWork: [
                    'https://www.uparcel.sg/static/uparceldelivery/img/block/deliveryboy.jpg',
                    'https://netstorage-legit.akamaized.net/images/c055f00834b2583d.png?imwidth=900',
                ],
            },
            feedback: {
                userName: 'Dương Hoàng Nam',
                rating: 5,
                content: 'giao đúng giờ',
            },
        },
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
                                onSelectEvent={showModal}
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
                    scheduleInfo={scheduleInfo}
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
                    <p>Staff: {event.staff}</p>
                    <p>Phone: {event.phone}</p>
                </Modal>
            )} */}
        </>
    );
};

export default Calendar;
