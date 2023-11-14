import { Button, MenuProps, Popover, Typography } from 'antd';
import { NotifyMenu, PopoverHeader } from './Notify.styled';

import { IoMdNotificationsOutline } from 'react-icons/io';
import { NotificationType } from '@/components/Toolbar/Toolbar.type';
import NotifyItem from '@/components/Notify/NotifyItem';
import { theme } from '@/themes';
import { useState } from 'react';
import config from '@/config';

const { Paragraph, Text } = Typography;

const Notify = ({ size, items }: { size?: number; items: NotificationType[] }) => {
    const DUMMY_AVATAR =
        'https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.15752-9/384469032_6609223889131065_8293022876449520388_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_ohc=gjDXwSBmi3YAX-hNO9i&_nc_ht=scontent.fsgn2-9.fna&oh=03_AdTYPieo_8M2sWscLr-rykTpN-IAaBS8JRWarwlkJQpKdA&oe=6540E586';
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
                to={`${config.routes.customer.schedule}/${123}`}
                image={DUMMY_AVATAR}
                title={
                    <Paragraph>
                        <strong>{item.title}</strong>
                        {item.message} at {item.notificationCreatedAt}
                    </Paragraph>
                }
                time="1 month ago"
                isRead={item.isRead}
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
                    size={size || 28}
                    color={theme.colors.textPrimary}
                    cursor="pointer"
                />
            </>
        </Popover>
    );
};

export default Notify;
