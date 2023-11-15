import config from '@/config';
import TaskList from '@/pages/Staff/Task/TaskList';
import { TaskStatus } from '@/utils/enums';

const Pending = () => {
    return (
        <TaskList
            title="Đang chờ"
            formattedDate
            link={config.routes.staff.task}
            taskStatus={TaskStatus.PENDING_WORKING}
        />
    );
};

export default Pending;
