import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import config from '@/config';

import tabs from './Job.tabs';
import * as St from './Job.styled';

const Job = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    if (pathname === config.routes.staff.job) {
        return <Navigate to={config.routes.staff.newJob} />;
    }

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
