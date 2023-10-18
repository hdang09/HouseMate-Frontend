import { useLocation, useNavigate } from 'react-router-dom';

import config from '@/config';
import { StaffTabs } from '@/layouts/StaffLayout/StaffLayout.styled';
import tabs from './Task.tabs';

const Task = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleChangeTabs = (key: string) => {
        navigate(key);
    };

    return (
        <>
            <StaffTabs
                defaultActiveKey={config.routes.staff.newJob}
                activeKey={pathname}
                items={tabs}
                centered
                onChange={handleChangeTabs}
            />
        </>
    );
};

export default Task;
