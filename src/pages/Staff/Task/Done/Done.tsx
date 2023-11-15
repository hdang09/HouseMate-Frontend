import { AiOutlineCheckCircle } from 'react-icons/ai';

import config from '@/config';
import TaskList from '@/pages/Staff/Task/TaskList';
import { TaskStatus } from '@/utils/enums';
import { theme } from '@/themes';

import { DoneLabel } from './Done.styled';

const Done = () => {
    return (
        <TaskList
            title="Đã hoàn thành"
            link={config.routes.staff.task}
            label={
                <DoneLabel>
                    <AiOutlineCheckCircle size={16} color={theme.colors.white} />
                </DoneLabel>
            }
            successText="Hoàn thành"
            taskStatus={TaskStatus.DONE}
        />
    );
};

export default Done;
