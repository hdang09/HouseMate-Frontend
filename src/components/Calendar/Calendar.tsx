import 'react-big-calendar/lib/css/react-big-calendar.css';

import * as Styled from './Calendar.styled';

import { Col, Drawer, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import Event from './Event';
import EventType, { ScheduleInfoType } from './Calendar.types';
import StatusPanel from './StatusPanel';
import { eventStyleGetter } from './Calendar.functions';
import { getCustomerEvents } from '@/utils/scheduleAPI';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import { useAppSelector } from '@/hooks';
import { useMediaQuery } from 'styled-breakpoints/use-media-query';
import { useTheme } from 'styled-components';
import ServiceModal from '../ServiceModal';

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

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };

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

    const scheduleInfo: ScheduleInfoType[] = [
        {
            serviceScheduleId: 1,
            parentScheduleId: 1,
            serviceId: 1,
            titleName: event?.title || 'Tên service',
            groupType: 'DELIVERY_SERVICE',
            startDate: '10/10/2023 8:00',
            endDate: '10/10/2023 8:00',
            cycle: 'Chỉ 1 lần',
            note: "Gọi sớm hơn 15'",
            serviceTypeId: 1,
            typeName: 'Bidrico bình vòi',
            status: 'DONE',
            usage: {
                userUsageId: 1,
                titleName: 'Dịch vụ giao nước bidrico',
            },
            quantityRetrieve: 3,
            customer: {
                userId: 66,
                fullName: 'Hoang Anh',
                phoneNumber: '0355529821',
                emailAddress: 'hoanganhnguyen3533@gmail.com',
                avatar: [
                    {
                        imageId: 129,
                        imageUrl: 'https://housematecdn.thanhf.dev/66.AVATAR.1698433358.webp',
                        userId: 66,
                        entityId: 66,
                        imageType: 'AVATAR',
                    },
                ],
            },
            staff: {
                userId: 76,
                profiencyScore: 100,
                avgRating: 0,
                workingStatus: 'ACTIVE',
                staffInfo: {
                    userId: 76,
                    role: 'STAFF',
                    fullName: 'Ma Le Phi Le',
                    phoneNumber: '0866123456',
                    emailAddress: 'Maleficient@gmail.com',
                    emailValidationStatus: false,
                    avatar: 'https://img.thuthuat123.com/uploads/2019/06/11/anh-nen-meo-de-thuong_093846627.jpg',
                    address: null,
                },
                banned: false,
            },
            taskReportList: [
                {
                    taskReportId: 12,
                    taskId: 9,
                    taskStatus: 'ARRIVED',
                    reportAt: '2023-11-03T01:35:20',
                    note: 'string',
                    taskReportImages: [],
                },
            ],

            feedback: { taskId: 0, serviceId: 0, rating: 0, content: null },
        },
        {
            serviceScheduleId: 1,
            parentScheduleId: 1,
            serviceId: 1,
            titleName: event?.title || 'Tên service',
            groupType: 'HOURLY_SERVICE',
            startDate: '10/10/2023 8:00',
            endDate: '10/10/2023 8:00',
            cycle: 'Chỉ 1 lần',
            note: "Gọi sớm hơn 15'",
            serviceTypeId: 1,
            typeName: 'Bidrico bình vòi',
            status: 'DONE',
            usage: {
                userUsageId: 1,
                titleName: 'Dịch vụ giao nước bidrico',
            },
            quantityRetrieve: 3,
            customer: {
                userId: 66,
                fullName: 'Hoang Anh',
                phoneNumber: '0355529821',
                emailAddress: 'hoanganhnguyen3533@gmail.com',
                avatar: [
                    {
                        imageId: 129,
                        imageUrl: 'https://housematecdn.thanhf.dev/66.AVATAR.1698433358.webp',
                        userId: 66,
                        entityId: 66,
                        imageType: 'AVATAR',
                    },
                ],
            },
            staff: {
                userId: 76,
                profiencyScore: 100,
                avgRating: 0,
                workingStatus: 'ACTIVE',
                staffInfo: {
                    userId: 76,
                    role: 'STAFF',
                    fullName: 'Ma Le Phi Le',
                    phoneNumber: '0866123456',
                    emailAddress: 'Maleficient@gmail.com',
                    emailValidationStatus: false,
                    avatar: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/118159693_777173249776031_8152831464517047066_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=73878a&_nc_ohc=vQ2t1Q57H9gAX_ch3B7&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfCctzBoVCtGd03oM_DMiJwPL3BfXyKzgpBGV57jQXXrQw&oe=656C3837',
                    address: null,
                },
                banned: false,
            },
            taskReportList: [
                {
                    taskReportId: 12,
                    taskId: 9,
                    taskStatus: 'ARRIVED',
                    reportAt: '2023-11-03T01:35:20',
                    note: 'string',
                    taskReportImages: [],
                },
                {
                    taskReportId: 13,
                    taskId: 9,
                    taskStatus: 'DOING',
                    reportAt: '2023-11-03T01:53:16',
                    note: 'string',
                    taskReportImages: [
                        'https://cdn.nguyenkimmall.com/images/detailed/530/cho-bao-nhieu-quan-ao-vao-may-giat-la-du-1.jpg',
                        'https://jpcleaning.com.vn/images/2022/01/13/02%20(1).jpg',
                        'https://th.bing.com/th/id/R.e0e60d72144c0ea863bf8b4f98ae6ce4?rik=4IQlXNOJZwIppg&riu=http%3a%2f%2fwww.scalesinc.com%2fLaundry_scale_with_basket_sm.jpg&ehk=7f1MK%2bSmcadgvC6MGh1y3jeGFCs9uTbyF7iqsz9XSD0%3d&risl=&pid=ImgRaw&r=0',
                    ],
                },
            ],
            feedback: {
                taskId: 0,
                serviceId: 0,
                rating: 0,
                content: null,
            },
        },
        {
            serviceScheduleId: 1,
            parentScheduleId: 1,
            serviceId: 1,
            titleName: event?.title || 'Tên service',
            groupType: 'RETURN_SERVICE',
            startDate: '2023-11-02 07:45:00',
            endDate: '2023-11-3 07:30:00',
            cycle: 'ONLY_ONE_TIME',
            note: "Gọi sớm hơn 15'",
            serviceTypeId: 1,
            typeName: 'Bidrico bình vòi',
            status: 'DONE',
            usage: {
                userUsageId: 1,
                titleName: 'Dịch vụ giao nước bidrico',
            },
            quantityRetrieve: 3,
            customer: {
                userId: 66,
                fullName: 'Hoang Anh',
                phoneNumber: '0355529821',
                emailAddress: 'hoanganhnguyen3533@gmail.com',
                avatar: [
                    {
                        imageId: 129,
                        imageUrl: 'https://housematecdn.thanhf.dev/66.AVATAR.1698433358.webp',
                        userId: 66,
                        entityId: 66,
                        imageType: 'AVATAR',
                    },
                ],
            },
            staff: {
                userId: 76,
                profiencyScore: 100,
                avgRating: 4.5,
                workingStatus: 'ACTIVE',
                staffInfo: {
                    userId: 76,
                    role: 'STAFF',
                    fullName: 'Ma Le Phi Le',
                    phoneNumber: '0866123456',
                    emailAddress: 'Maleficient@gmail.com',
                    emailValidationStatus: false,
                    avatar: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/118159693_777173249776031_8152831464517047066_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=73878a&_nc_ohc=vQ2t1Q57H9gAX_ch3B7&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfCctzBoVCtGd03oM_DMiJwPL3BfXyKzgpBGV57jQXXrQw&oe=656C3837',
                    address: null,
                },
                banned: false,
            },
            taskReportList: [
                {
                    taskReportId: 12,
                    taskId: 9,
                    taskStatus: 'ARRIVED',
                    reportAt: '2023-11-03T01:35:20',
                    note: 'string',
                    taskReportImages: [],
                },
                {
                    taskReportId: 13,
                    taskId: 9,
                    taskStatus: 'DOING',
                    reportAt: '2023-11-03T01:53:16',
                    note: 'string',
                    taskReportImages: [
                        'https://cdn.nguyenkimmall.com/images/detailed/530/cho-bao-nhieu-quan-ao-vao-may-giat-la-du-1.jpg',
                        'https://jpcleaning.com.vn/images/2022/01/13/02%20(1).jpg',
                        'https://th.bing.com/th/id/R.e0e60d72144c0ea863bf8b4f98ae6ce4?rik=4IQlXNOJZwIppg&riu=http%3a%2f%2fwww.scalesinc.com%2fLaundry_scale_with_basket_sm.jpg&ehk=7f1MK%2bSmcadgvC6MGh1y3jeGFCs9uTbyF7iqsz9XSD0%3d&risl=&pid=ImgRaw&r=0',
                        'https://cdn.nguyenkimmall.com/images/detailed/530/cho-bao-nhieu-quan-ao-vao-may-giat-la-du-1.jpg',
                    ],
                },
                {
                    taskReportId: 14,
                    taskId: 9,
                    taskStatus: 'DONE',
                    reportAt: '2023-11-03T01:53:45',
                    note: 'string',
                    taskReportImages: [
                        'https://cdn.nguyenkimmall.com/images/detailed/530/cho-bao-nhieu-quan-ao-vao-may-giat-la-du-1.jpg',
                        'https://jpcleaning.com.vn/images/2022/01/13/02%20(1).jpg',
                        'https://th.bing.com/th/id/R.e0e60d72144c0ea863bf8b4f98ae6ce4?rik=4IQlXNOJZwIppg&riu=http%3a%2f%2fwww.scalesinc.com%2fLaundry_scale_with_basket_sm.jpg&ehk=7f1MK%2bSmcadgvC6MGh1y3jeGFCs9uTbyF7iqsz9XSD0%3d&risl=&pid=ImgRaw&r=0',
                    ],
                },
            ],
            feedback: {
                taskId: 0,
                serviceId: 0,
                rating: 5,
                content: 'giao đúng giờ',
            },
        },
        {
            serviceScheduleId: 1,
            parentScheduleId: 1,
            serviceId: 1,
            titleName: event?.title || 'Tên service',
            groupType: 'HOURLY_SERVICE',
            startDate: '2023-11-02 07:45:00',
            endDate: '2023-11-3 07:30:00',
            cycle: 'ONLY_ONE_TIME',
            note: "Gọi sớm hơn 15'",
            serviceTypeId: 1,
            typeName: 'Bidrico bình vòi',
            status: 'DONE',
            usage: {
                userUsageId: 1,
                titleName: 'Dịch vụ giao nước bidrico',
            },
            quantityRetrieve: 3,
            customer: {
                userId: 66,
                fullName: 'Hoang Anh',
                phoneNumber: '0355529821',
                emailAddress: 'hoanganhnguyen3533@gmail.com',
                avatar: [
                    {
                        imageId: 129,
                        imageUrl: 'https://housematecdn.thanhf.dev/66.AVATAR.1698433358.webp',
                        userId: 66,
                        entityId: 66,
                        imageType: 'AVATAR',
                    },
                ],
            },
            staff: {
                userId: 76,
                profiencyScore: 100,
                avgRating: 4.5,
                workingStatus: 'ACTIVE',
                staffInfo: {
                    userId: 76,
                    role: 'STAFF',
                    fullName: 'Ma Le Phi Le',
                    phoneNumber: '0866123456',
                    emailAddress: 'Maleficient@gmail.com',
                    emailValidationStatus: false,
                    avatar: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/118159693_777173249776031_8152831464517047066_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=73878a&_nc_ohc=vQ2t1Q57H9gAX_ch3B7&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfCctzBoVCtGd03oM_DMiJwPL3BfXyKzgpBGV57jQXXrQw&oe=656C3837',
                    address: null,
                },
                banned: false,
            },
            taskReportList: [
                {
                    taskReportId: 12,
                    taskId: 9,
                    taskStatus: 'ARRIVED',
                    reportAt: '2023-11-03T01:35:20',
                    note: 'string',
                    taskReportImages: [],
                },
                {
                    taskReportId: 13,
                    taskId: 9,
                    taskStatus: 'DOING',
                    reportAt: '2023-11-03T01:53:16',
                    note: 'string',
                    taskReportImages: [
                        'https://cdn.nguyenkimmall.com/images/detailed/530/cho-bao-nhieu-quan-ao-vao-may-giat-la-du-1.jpg',
                        'https://jpcleaning.com.vn/images/2022/01/13/02%20(1).jpg',
                        'https://th.bing.com/th/id/R.e0e60d72144c0ea863bf8b4f98ae6ce4?rik=4IQlXNOJZwIppg&riu=http%3a%2f%2fwww.scalesinc.com%2fLaundry_scale_with_basket_sm.jpg&ehk=7f1MK%2bSmcadgvC6MGh1y3jeGFCs9uTbyF7iqsz9XSD0%3d&risl=&pid=ImgRaw&r=0',
                        'https://cdn.nguyenkimmall.com/images/detailed/530/cho-bao-nhieu-quan-ao-vao-may-giat-la-du-1.jpg',
                    ],
                },
                {
                    taskReportId: 14,
                    taskId: 9,
                    taskStatus: 'DONE',
                    reportAt: '2023-10-03T01:53:45',
                    note: 'string',
                    taskReportImages: [
                        'https://cdn.nguyenkimmall.com/images/detailed/530/cho-bao-nhieu-quan-ao-vao-may-giat-la-du-1.jpg',
                        'https://jpcleaning.com.vn/images/2022/01/13/02%20(1).jpg',
                        'https://th.bing.com/th/id/R.e0e60d72144c0ea863bf8b4f98ae6ce4?rik=4IQlXNOJZwIppg&riu=http%3a%2f%2fwww.scalesinc.com%2fLaundry_scale_with_basket_sm.jpg&ehk=7f1MK%2bSmcadgvC6MGh1y3jeGFCs9uTbyF7iqsz9XSD0%3d&risl=&pid=ImgRaw&r=0',
                    ],
                },
            ],
            feedback: {
                taskId: 0,
                serviceId: 0,
                rating: 0,
                content: null,
            },
        },
        {
            serviceScheduleId: 1,
            parentScheduleId: 1,
            serviceId: 189,
            titleName: event?.title || 'Tên service',
            groupType: 'RETURN_SERVICE',
            startDate: '2023-11-02 07:45:00',
            endDate: '2023-11-3 07:30:00',
            cycle: 'Chỉ 1 lần',
            note: "Gọi sớm hơn 15'",
            serviceTypeId: 1,
            typeName: 'Bidrico bình vòi',
            status: 'DONE',
            usage: {
                userUsageId: 1,
                titleName: 'Dịch vụ giao nước bidrico',
            },
            quantityRetrieve: 3,
            customer: {
                userId: 66,
                fullName: 'Hoang Anh',
                phoneNumber: '0355529821',
                emailAddress: 'hoanganhnguyen3533@gmail.com',
                avatar: [
                    {
                        imageId: 129,
                        imageUrl: 'https://housematecdn.thanhf.dev/66.AVATAR.1698433358.webp',
                        userId: 66,
                        entityId: 66,
                        imageType: 'AVATAR',
                    },
                ],
            },
            staff: {
                userId: 76,
                profiencyScore: 100,
                avgRating: 4.5,
                workingStatus: 'ACTIVE',
                staffInfo: {
                    userId: 76,
                    role: 'STAFF',
                    fullName: 'Ma Le Phi Le',
                    phoneNumber: '0866123456',
                    emailAddress: 'Maleficient@gmail.com',
                    emailValidationStatus: false,
                    avatar: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/118159693_777173249776031_8152831464517047066_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=73878a&_nc_ohc=vQ2t1Q57H9gAX_ch3B7&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfCctzBoVCtGd03oM_DMiJwPL3BfXyKzgpBGV57jQXXrQw&oe=656C3837',
                    address: null,
                },
                banned: false,
            },
            taskReportList: [
                {
                    taskReportId: 12,
                    taskId: 76,
                    taskStatus: 'ARRIVED',
                    reportAt: '2023-11-03T01:35:20',
                    note: 'string',
                    taskReportImages: [],
                },
                {
                    taskReportId: 13,
                    taskId: 76,
                    taskStatus: 'DOING',
                    reportAt: '2023-11-03T01:53:16',
                    note: 'string',
                    taskReportImages: [
                        'https://cdn.nguyenkimmall.com/images/detailed/530/cho-bao-nhieu-quan-ao-vao-may-giat-la-du-1.jpg',
                        'https://jpcleaning.com.vn/images/2022/01/13/02%20(1).jpg',
                        'https://th.bing.com/th/id/R.e0e60d72144c0ea863bf8b4f98ae6ce4?rik=4IQlXNOJZwIppg&riu=http%3a%2f%2fwww.scalesinc.com%2fLaundry_scale_with_basket_sm.jpg&ehk=7f1MK%2bSmcadgvC6MGh1y3jeGFCs9uTbyF7iqsz9XSD0%3d&risl=&pid=ImgRaw&r=0',
                        'https://cdn.nguyenkimmall.com/images/detailed/530/cho-bao-nhieu-quan-ao-vao-may-giat-la-du-1.jpg',
                    ],
                },
                {
                    taskReportId: 14,
                    taskId: 76,
                    taskStatus: 'DONE',
                    reportAt: '2023-11-03T01:53:45',
                    note: 'string',
                    taskReportImages: [
                        'https://cdn.nguyenkimmall.com/images/detailed/530/cho-bao-nhieu-quan-ao-vao-may-giat-la-du-1.jpg',
                        'https://jpcleaning.com.vn/images/2022/01/13/02%20(1).jpg',
                        'https://th.bing.com/th/id/R.e0e60d72144c0ea863bf8b4f98ae6ce4?rik=4IQlXNOJZwIppg&riu=http%3a%2f%2fwww.scalesinc.com%2fLaundry_scale_with_basket_sm.jpg&ehk=7f1MK%2bSmcadgvC6MGh1y3jeGFCs9uTbyF7iqsz9XSD0%3d&risl=&pid=ImgRaw&r=0',
                    ],
                },
            ],
            feedback: {
                taskId: 0,
                serviceId: 0,
                rating: 0,
                content: null,
            },
        },
        {
            serviceScheduleId: 1,
            parentScheduleId: 1,
            serviceId: 189,
            titleName: event?.title || 'Tên service',
            groupType: 'HOURLY_SERVICE',
            startDate: '2023-11-06 07:45:00',
            endDate: '2023-11-8 07:30:00',
            cycle: 'EVERY_WEEK',
            note: "Gọi sớm hơn 15'",
            serviceTypeId: 1,
            typeName: 'Bidrico bình vòi',
            status: 'DONE',
            usage: {
                userUsageId: 1,
                titleName: 'Dịch vụ giao nước bidrico',
            },
            quantityRetrieve: 3,
            customer: {
                userId: 66,
                fullName: 'Hoang Anh',
                phoneNumber: '0355529821',
                emailAddress: 'hoanganhnguyen3533@gmail.com',
                avatar: [
                    {
                        imageId: 129,
                        imageUrl: 'https://housematecdn.thanhf.dev/66.AVATAR.1698433358.webp',
                        userId: 66,
                        entityId: 66,
                        imageType: 'AVATAR',
                    },
                ],
            },
            staff: null,
            taskReportList: [],
            feedback: {
                taskId: 0,
                serviceId: 0,
                rating: 0,
                content: null,
            },
        },
    ];

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
                    scheduleInfo={scheduleInfo[5]}
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
