import { BiPhoneIncoming } from 'react-icons/bi';

import config from '@/config';
import { theme } from '@/themes';
import { TaskStatus } from '@/utils/enums';
import TaskList from '@/pages/Staff/Task/TaskList';

import { IncomingLabel } from './Incoming.styled';

const Incoming = () => {
    return (
        <TaskList
            title="Sắp đến"
            link={config.routes.staff.task}
            label={
                <IncomingLabel>
                    <BiPhoneIncoming size={16} color={theme.colors.white} />
                </IncomingLabel>
            }
            taskStatus={TaskStatus.INCOMING}
        />
    );
};

export default Incoming;
