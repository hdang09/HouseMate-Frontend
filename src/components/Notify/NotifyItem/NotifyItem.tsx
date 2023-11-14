import { Avatar, Typography } from 'antd';
import { NotificationItemContent, NotificationItemWrapper } from './NotifyItem.styled';
import { markAsRead } from '@/utils/notificationAPI';

type NotifyItemProps = {
    to: string;
    image: string;
    title: JSX.Element;
    time: string;
    isRead: boolean;
    notificationId: number;
};

const { Text } = Typography;

const NotifyItem = ({ to, image, title, time, isRead, notificationId }: NotifyItemProps) => {
    const handleRead = async () => {
        await markAsRead(notificationId);
    };

    return (
        <NotificationItemWrapper to={to} $isRead={isRead} onClick={handleRead}>
            <Avatar src={image} alt={time} size={56} />

            <NotificationItemContent>
                {title}
                <Text>{time}</Text>
            </NotificationItemContent>
        </NotificationItemWrapper>
    );
};

export default NotifyItem;
