import { MenuProps, Typography } from 'antd';

import user from '@/assets/images/user-img.jpg';
import config from '@/config';

import NotificationItem from './NotifyItem';
import { NotifyMenu } from './Notify.styled';

const { Paragraph, Text } = Typography;

// TODO Làm ơn nhớ tách file
const items: MenuProps['items'] = [
    {
        key: 1,
        label: (
            <NotificationItem
                to={config.routes.home}
                image={user}
                title={
                    <Paragraph>
                        Task
                        <Text strong>Cleaning House</Text>
                        at 15 AM 30/09/2023 is coming
                    </Paragraph>
                }
                time="1 month ago"
            />
        ),
    },
    {
        key: 2,
        label: (
            <NotificationItem
                to={config.routes.home}
                image={user}
                title={
                    <Paragraph>
                        <Text strong>Laundry</Text>
                        service is completed
                    </Paragraph>
                }
                time="2 month ago"
            />
        ),
    },
    {
        key: 3,
        label: (
            <NotificationItem
                to={config.routes.home}
                image={user}
                title={
                    <Paragraph>
                        <Text strong>Water delivery</Text>
                        service is completed
                    </Paragraph>
                }
                time="3 month ago"
            />
        ),
    },
];

const Notify = () => {
    return <NotifyMenu items={items} title="Notification" />;
};

export default Notify;
