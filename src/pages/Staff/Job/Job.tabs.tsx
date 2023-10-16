import { TabsProps } from 'antd';

import config from '@/config';
import New from './New';
import Waiting from './Waiting';
import Confirmed from './Confirmed';

const tabs: TabsProps['items'] = [
    {
        key: config.routes.staff.newJob,
        label: 'Việc mới',
        children: <New />,
    },
    {
        key: config.routes.staff.waitingConfirmJob,
        label: 'Chờ xác nhận',
        children: <Waiting />,
    },
    {
        key: config.routes.staff.confirmedJob,
        label: 'Xác nhận',
        children: <Confirmed />,
    },
];

export default tabs;
