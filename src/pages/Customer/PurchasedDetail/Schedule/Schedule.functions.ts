import { Event } from '@/pages/Customer/PurchasedDetail/PurchasedDetail.types';
import { Status } from '@/utils/enums';
import { theme } from '@/themes';

export const eventStyleGetter = (event: Event) => {
    const OPACITY_40 = '64';
    const BORDER_STYLE = '3px solid ';

    let color = theme.colors.black;

    switch (event.status) {
        case Status.INCOMING:
            color = theme.colors.incoming;
            break;
        case Status.DONE:
            color = theme.colors.done;
            break;
        case Status.CANCEL:
            color = theme.colors.cancel;
            break;
        case Status.PROCESSING:
            color = theme.colors.processing;
            break;
        case Status.PENDING:
            color = theme.colors.pending;
            break;
        default:
            break;
    }

    return {
        style: {
            backgroundColor: color + OPACITY_40,
            color: theme.colors.black,
            borderColor: 'transparent',
            borderLeft: BORDER_STYLE + color,
        },
    };
};
