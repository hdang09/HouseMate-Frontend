import { Avatar, Typography } from 'antd';
import { NotificationItemContent, NotificationItemWrapper } from './NotifyItem.styled';

type NotifyItemProps = {
    to: string;
    image: string;
    title: JSX.Element;
    time: string;
};

const { Text } = Typography;

const NotifyItem = ({ to, image, title, time }: NotifyItemProps) => {
    return (
        <NotificationItemWrapper to={to}>
            <Avatar src={image} alt={time} size={60} />

            <NotificationItemContent>
                {title}
                <Text>{time}</Text>
            </NotificationItemContent>
        </NotificationItemWrapper>
    );
};

export default NotifyItem;
