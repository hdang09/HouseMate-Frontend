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
                isRead={false}
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
                isRead={false}
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
                isRead={true}
            />
        ),
    },
    {
        key: 4,
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
                isRead={true}
            />
        ),
    },
    {
        key: 5,
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
                isRead={true}
            />
        ),
    },
    {
        key: 6,
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
                isRead={true}
            />
        ),
    },
    {
        key: 7,
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
                isRead={true}
            />
        ),
    },
    {
        key: 8,
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
                isRead={true}
            />
        ),
    },
    {
        key: 9,
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
                isRead={true}
            />
        ),
    },
    {
        key: 10,
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
                isRead={true}
            />
        ),
    },
];

const Notify = () => {
    return <NotifyMenu items={items} title="Notification" />;
};

export default Notify;
