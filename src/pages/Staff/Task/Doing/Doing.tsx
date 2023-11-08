import { TbProgressCheck } from 'react-icons/tb';

import config from '@/config';
import TaskList from '@/pages/Staff/Task/TaskList';
import { TaskStatus } from '@/utils/enums';
import { theme } from '@/themes';

import { DoingLabel } from './Doing.styled';

const Doing = () => {
    return (
        <TaskList
            title="Đang làm việc"
            link={config.routes.staff.task}
            label={
                <DoingLabel>
                    <TbProgressCheck size={16} color={theme.colors.white} />
                </DoingLabel>
            }
            taskStatus={TaskStatus.DOING}
        />
    );
};

export default Doing;
