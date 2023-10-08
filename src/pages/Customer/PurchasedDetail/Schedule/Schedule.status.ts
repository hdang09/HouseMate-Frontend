import { Status } from '@/utils/enums';
import { theme } from '@/themes';

const STATUS = [
    { color: theme.colors.done, name: Status.DONE },
    { color: theme.colors.processing, name: Status.PROCESSING },
    { color: theme.colors.incoming, name: Status.INCOMING },
    { color: theme.colors.cancel, name: Status.CANCEL },
    { color: theme.colors.pending, name: Status.PENDING },
];

export default STATUS;
