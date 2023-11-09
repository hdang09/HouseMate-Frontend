import { MdOutlinePermPhoneMsg } from 'react-icons/md';
import config from '@/config';
import TaskList from '@/pages/Staff/Task/TaskList';
import { TaskStatus } from '@/utils/enums';
import { theme } from '@/themes';
import { IncomingLabel } from '@/pages/Staff/Task/Incoming/Incoming.styled';

const Doing = () => {
    return (
        <TaskList
            title="Đang làm việc"
            link={config.routes.staff.task}
            label={
                <IncomingLabel>
                    <MdOutlinePermPhoneMsg size={16} color={theme.colors.white} />
                </IncomingLabel>
            }
            taskStatus={TaskStatus.DOING}
        />
    );
};

export default Doing;
