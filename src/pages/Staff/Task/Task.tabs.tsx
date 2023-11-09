import { TabsProps } from 'antd';

import config from '@/config';
import Done from './Done';
import Incoming from './Incoming';
import Pending from './Pending';
import Cancel from './Cancel';
import Doing from './Doing/Doing';

const tabs: TabsProps['items'] = [
    {
        key: config.routes.staff.pendingTask,
        label: 'Chờ thực hiện',
        children: <Pending />,
    },
    {
        key: config.routes.staff.incomingTask,
        label: 'Sắp đến',
        children: <Incoming />,
    },
    {
        key: config.routes.staff.doingTask,
        label: 'Đang làm việc',
        children: <Doing />,
    },
    {
        key: config.routes.staff.doneTask,
        label: 'Đã hoàn thành',
        children: <Done />,
    },
    {
        key: config.routes.staff.cancelTask,
        label: 'Đã hủy',
        children: <Cancel />,
    },
];

export default tabs;
