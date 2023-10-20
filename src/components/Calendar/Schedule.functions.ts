import EventType from './Schedule.types';
import { Status } from '@/utils/enums';
import { theme } from '@/themes';

export const eventStyleGetter = (event: EventType) => {
    const BORDER_STYLE = '3px solid ';

    let color = theme.colors.black;
    let backgroundColor = theme.colors.grey;

    switch (event.status) {
        case Status.INCOMING:
            color = theme.colors.incoming;
            backgroundColor = theme.colors.incomingBackground;
            break;
        case Status.DONE:
            color = theme.colors.done;
            backgroundColor = theme.colors.doneBackground;
            break;
        case Status.CANCEL:
            color = theme.colors.cancel;
            backgroundColor = theme.colors.cancelBackground;
            break;
        case Status.PROCESSING:
            color = theme.colors.processing;
            backgroundColor = theme.colors.processingBackground;
            break;
        case Status.PENDING:
            color = theme.colors.pending;
            backgroundColor = theme.colors.pendingBackground;
            break;
        default:
            break;
    }

    return {
        style: {
            backgroundColor: backgroundColor,
            color: theme.colors.black,
            borderColor: 'transparent',
            borderLeft: BORDER_STYLE + color,
        },
    };
};
