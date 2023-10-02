import { Button, MenuProps, Popover, Typography } from 'antd';
import { useState } from 'react';

import user from '@/assets/images/user-img.jpg';

import NotifyItem from '@/components/NotifyItem';
import { NotificationType } from '@/components/Toolbar/Toolbar.type';
import { theme } from '@/themes';

import { NotifyMenu, PopoverHeader } from './Notify.styled';
import { IoMdNotificationsOutline } from 'react-icons/io';

const { Paragraph, Text } = Typography;

const Notify = ({ items }: { items: NotificationType[] }) => {
    const [open, setOpen] = useState(false);

    const handleClosePopover = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const notifies = items.map((item) => ({
        key: item.notificationId,
        label: (
            <NotifyItem
                to={`/purchased/${item.data.serviceId}/${item.data.taskId}`}
                image={user}
                title={
                    <Paragraph>
                        <strong>{item.data.serviceName}</strong>
                        at {item.date} {item.data.label}
                    </Paragraph>
                }
                time="1 month ago"
                isRead={item.data.isRead}
            />
        ),
    }));

    return (
        <Popover
            content={
                <NotifyMenu
                    items={notifies as MenuProps['items']}
                    title="Notification"
                    onClick={handleClosePopover}
                />
            }
            title={
                <PopoverHeader>
                    <Text>Notifications</Text>
                    <Button>Mark all as read</Button>
                </PopoverHeader>
            }
            trigger="click"
            overlayInnerStyle={{
                padding: '12px 0',
            }}
            open={open}
            onOpenChange={handleOpenChange}
        >
            <>
                <IoMdNotificationsOutline
                    size={28}
                    color={theme.colors.textPrimary}
                    cursor="pointer"
                />
            </>
        </Popover>
    );
};

export default Notify;
