import { TabsProps } from 'antd';

import config from '@/config';
import Pending from './Pending';
import Incoming from './Incoming';
import Arrived from './Arrived';
import Doing from './Doing';
import Done from './Done';
import Cancel from './Cancel';

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
        key: config.routes.staff.arrivedTask,
        label: 'Đã đến',
        children: <Arrived />,
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
