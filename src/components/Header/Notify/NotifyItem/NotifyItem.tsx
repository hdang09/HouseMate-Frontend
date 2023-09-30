import { Avatar, Typography } from 'antd';
import { NotificationItemContent, NotificationItemWrapper } from './NotifyItem.styled';

type NotifyItemProps = {
    to: string;
    image: string;
    title: JSX.Element;
    time: string;
    isRead: boolean;
};

const { Text } = Typography;

const NotifyItem = ({ to, image, title, time, isRead }: NotifyItemProps) => {
    return (
        <NotificationItemWrapper to={to} $isRead={isRead}>
            <Avatar src={image} alt={time} size={50} />

            <NotificationItemContent>
                {title}
                <Text>{time}</Text>
            </NotificationItemContent>
        </NotificationItemWrapper>
    );
};

export default NotifyItem;
