import 'react-big-calendar/lib/css/react-big-calendar.css';

import * as Styled from './Schedule.styled';

import { Col, Drawer, Modal, Row, Skeleton } from 'antd';
import { useEffect, useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import Event from './Event';
import EventType from './Schedule.types';
import StatusPanel from './StatusPanel';
import { eventStyleGetter } from './Schedule.functions';
import { getEvents } from '@/utils/scheduleAPI';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import { useAppSelector } from '@/hooks';
import { useMediaQuery } from 'styled-breakpoints/use-media-query';
import { useTheme } from 'styled-components';

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
                const { data } = await getEvents();

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

    return (
        <>
            <Styled.ScheduleTitle level={3}>Your week schdule</Styled.ScheduleTitle>

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
                        <Styled.StatusPanelText>Status Panel</Styled.StatusPanelText>
                    </Styled.PanelWrapper>

                    <Drawer
                        title="Status Panel"
                        placement="left"
                        onClose={onClose}
                        open={openDrawer}
                    >
                        <StatusPanel direction="vertical" align="start" />
                    </Drawer>
                </Col>

                <Col xs={24} xl={20}>
                    <Styled.CalendarWrapper>
                        <Skeleton loading={loading}>
                            <Styled.Calendar
                                localizer={localizer}
                                events={events}
                                eventPropGetter={eventStyleGetter}
                                components={{
                                    header: ({ date }) => moment(date).format('ddd (DD/MM)'),
                                    event: Event,
                                }}
                                min={new Date(0, 0, 0, 7, 0, 0)}
                                max={new Date(0, 0, 0, 19, 0, 0)}
                                length={50}
                                onSelectEvent={showModal}
                                enableAutoScroll
                                defaultView="week"
                                views={['week', 'day']}
                            />
                        </Skeleton>
                    </Styled.CalendarWrapper>
                </Col>
            </Row>

            {event && (
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
            )}
        </>
    );
};

export default Calendar;
