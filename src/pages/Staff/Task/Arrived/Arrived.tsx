import { AiOutlineEnvironment } from 'react-icons/ai';

import config from '@/config';
import TaskList from '@/pages/Staff/Task/TaskList';
import { TaskStatus } from '@/utils/enums';
import { theme } from '@/themes';

import { ArrivedLabel } from './Arrived.styled';

const Arrived = () => {
    return (
        <TaskList
            title="Đã đến"
            text="Báo cáo"
            link={config.routes.staff.task}
            label={
                <ArrivedLabel>
                    <AiOutlineEnvironment size={16} color={theme.colors.white} />
                </ArrivedLabel>
            }
            taskStatus={TaskStatus.ARRIVED}
        />
    );
};

export default Arrived;
