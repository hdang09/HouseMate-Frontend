import 'react-big-calendar/lib/css/react-big-calendar.css';

import * as Styled from './Schedule.styled';

import { Button, Modal, Space } from 'antd';

import Event from './Event';
import type { Event as EventType } from '@/pages/Customer/PurchasedDetail/PurchasedDetail.types';
import STATUS from './Schedule.status';
import { eventStyleGetter } from './Schedule.functions';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

const Schedule = ({ events }: { events: EventType[] }) => {
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

    return (
        <>
            <Styled.ScheduleTitle level={3}>Your week schdule</Styled.ScheduleTitle>

            <Styled.StatusWrapper size={75}>
                <Button type="primary">Create new schedule</Button>

                <Space size="large">
                    {STATUS.map((item) => (
                        <Styled.StatusItem key={item.name} $color={item.color}>
                            {item.name}
                        </Styled.StatusItem>
                    ))}
                </Space>
            </Styled.StatusWrapper>

            <Styled.Calendar
                localizer={localizer}
                events={events}
                eventPropGetter={eventStyleGetter}
                components={{
                    header: ({ date }) => moment(date).format('ddd (DD/MM)'),
                    event: Event,
                }}
                min={new Date(0, 0, 0, 6, 0, 0)}
                max={new Date(0, 0, 0, 21, 0, 0)}
                defaultDate={new Date(2023, 9, 8)} // TODO: Remove it when all complete
                defaultView="week"
                views={['week', 'day']}
                onSelectEvent={showModal}
            />

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

export default Schedule;
