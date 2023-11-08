import config from '@/config';
import TaskList from '@/pages/Staff/Task/TaskList';
import { TaskStatus } from '@/utils/enums';

const Cancel = () => {
    return (
        <TaskList
            title="Đã hủy"
            link={config.routes.staff.task}
            cancelText="Đã hủy"
            taskStatus={TaskStatus.CANCELLED}
        />
    );
};

export default Cancel;
