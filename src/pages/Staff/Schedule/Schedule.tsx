import * as St from './Schedule.styled';

import { useAuth, useDocumentTitle } from '@/hooks';

import Calendar from '@/components/Calendar';
import { Typography } from 'antd';

const NOTES = [
    'Nhân viên cần theo dõi lịch và liên hệ khách hàng trước khi làm việc ít nhất 1 tiếng.',
    'Nhân viên có thể ấn vào xem nhận xét của khách hàng sau khi hoàn thành công việc.',
];

interface InfoType {
    title: string;
    content: string;
}

const Schedule = () => {
    useDocumentTitle('Lịch Trình Làm Việc | HouseMate');

    const { user } = useAuth();

    const info: InfoType[] = [
        {
            title: 'Tên',
            content: user?.fullName || '',
        },
        {
            title: 'Số điện thoại',
            content: user?.phoneNumber || '',
        },
        {
            title: 'Địa chỉ',
            content: user?.address || '',
        },
    ];

    return (
        <>
            <St.Title>Thông tin làm việc</St.Title>

            <St.Section>
                <St.TitleList>Thông tin nhân viên</St.TitleList>

                <St.List
                    split={false}
                    dataSource={info}
                    renderItem={(item: InfoType) => (
                        <St.Item>
                            <Typography.Text strong>{item.title}:</Typography.Text> {item.content}
                        </St.Item>
                    )}
                />
            </St.Section>

            <St.Section>
                <St.TitleList level={2}>Ghi chú</St.TitleList>

                <St.List
                    dataSource={NOTES}
                    renderItem={(note: string) => <St.Item>• {note}</St.Item>}
                />
            </St.Section>

            <St.CalendarWrapper>
                <Calendar />
            </St.CalendarWrapper>
        </>
    );
};

export default Schedule;
