import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import config from '@/config';
import { StaffTabs } from '@/layouts/StaffLayout/StaffLayout.styled';
import { useDocumentTitle } from '@/hooks';

import tabs from './Task.tabs';

const Task = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [documentTitle, setDocumentTitle] = useState<string>('Đang tải...');

    useDocumentTitle(documentTitle);

    useEffect(() => {
        switch (pathname) {
            case config.routes.staff.incomingTask:
                setDocumentTitle('Sắp Đến | HouseMate');
                break;

            case config.routes.staff.pendingTask:
                setDocumentTitle('Chờ Thực Hiện | HouseMate');
                break;

            case config.routes.staff.doneTask:
                setDocumentTitle('Đã Hoàn Thành | HouseMate');
                break;

            default:
                break;
        }
    }, [pathname]);

    const handleChangeTabs = (key: string) => {
        navigate(key);
    };

    return (
        <>
            <StaffTabs
                defaultActiveKey={config.routes.staff.incomingTask}
                activeKey={pathname}
                items={tabs}
                centered
                onChange={handleChangeTabs}
            />
        </>
    );
};

export default Task;
