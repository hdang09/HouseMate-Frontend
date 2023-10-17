import { useLocation, useNavigate } from 'react-router-dom';

import config from '@/config';

import tabs from './Job.tabs';
import * as St from './Job.styled';

const Job = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleChangeTabs = (key: string) => {
        navigate(key);
    };

    return (
        <>
            <St.JobTabs
                defaultActiveKey={config.routes.staff.newJob}
                activeKey={pathname}
                items={tabs}
                centered
                onChange={handleChangeTabs}
            />
        </>
    );
};

export default Job;