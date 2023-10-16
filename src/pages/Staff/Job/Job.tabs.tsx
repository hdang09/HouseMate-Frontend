import { TabsProps } from 'antd';

import config from '@/config';
import JobNew from './Job.new';

const tabs: TabsProps['items'] = [
    {
        key: config.routes.staff.newJob,
        label: 'Việc mới',
        children: <JobNew />,
    },
    {
        key: config.routes.staff.waitingConfirmJob,
        label: 'Chờ xác nhận',
        children: 'Content of Tab Pane 2',
    },
    {
        key: config.routes.staff.confirmedJob,
        label: 'Xác nhận',
        children: 'Content of Tab Pane 3',
    },
];

export default tabs;
