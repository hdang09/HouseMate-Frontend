import { theme } from '@/themes';

interface Status {
    color: string;
    name: string;
}

const STATUS: Status[] = [
    { color: theme.colors.done, name: 'Done' },
    { color: theme.colors.processing, name: 'Processing' },
    { color: theme.colors.incoming, name: 'Incoming' },
    { color: theme.colors.cancel, name: 'Cancel' },
    { color: theme.colors.pending, name: 'Pending' },
];

export default STATUS;
