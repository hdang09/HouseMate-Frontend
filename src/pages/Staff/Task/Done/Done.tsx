import config from '@/config';
import TaskList from '@/pages/Staff/Task/TaskList';
import { TaskStatus } from '@/utils/enums';

const Done = () => {
    return (
        <TaskList
            title="Đã hoàn thành"
            link={config.routes.staff.task}
            successText="Hoàn thành"
            cancelText="bị hủy"
            taskStatus={TaskStatus.DONE}
        />
    );
};

export default Done;
