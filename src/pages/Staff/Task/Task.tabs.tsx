import { TabsProps } from 'antd';

import config from '@/config';
import Done from './Done';
import Incoming from './Incoming';
import Pending from './Pending';

const tabs: TabsProps['items'] = [
    {
        key: config.routes.staff.doneTask,
        label: 'Đã hoàn thành',
        children: <Done />,
    },
    {
        key: config.routes.staff.incomingTask,
        label: 'Sắp đến',
        children: <Incoming />,
    },
    {
        key: config.routes.staff.pendingTask,
        label: 'Đang chờ',
        children: <Pending />,
    },
];

export default tabs;
