import { AiOutlineCloseCircle } from 'react-icons/ai';

import config from '@/config';
import TaskList from '@/pages/Staff/Task/TaskList';
import { TaskStatus } from '@/utils/enums';
import { theme } from '@/themes';

import { CancelLabel } from './Cancel.styled';

const Cancel = () => {
    return (
        <TaskList
            title="Đã hủy"
            link={config.routes.staff.task}
            label={
                <CancelLabel>
                    <AiOutlineCloseCircle size={16} color={theme.colors.white} />
                </CancelLabel>
            }
            cancelText="Đã hủy"
            taskStatus={TaskStatus.CANCELLED}
        />
    );
};

export default Cancel;
