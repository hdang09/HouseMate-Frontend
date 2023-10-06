import { theme } from '@/themes';

enum Service {
    CLEANING = 'Cleaning house',
    WATER = 'Water delivery',
    RICE = 'Rice delivery',
    LAUNDRY = 'Laundry',
}

export enum Status {
    INCOMING = 'Incoming',
    DONE = 'Done',
    CANCEL = 'Cancel',
    PROCESSING = 'Processing',
    PENDING = 'Pending',
}

export interface Event {
    title: string;
    start: Date;
    end: Date;
    status: Status;
}

const events: Event[] = [
    {
        title: Service.CLEANING,
        start: new Date(2023, 9, 8, 7, 0),
        end: new Date(2023, 9, 8, 9, 0),
        status: Status.DONE,
    },
    {
        title: Service.WATER,
        start: new Date(2023, 9, 8, 16, 0),
        end: new Date(2023, 9, 8, 18, 0),
        status: Status.DONE,
    },
    {
        title: Service.RICE,
        start: new Date(2023, 9, 9, 9, 0),
        end: new Date(2023, 9, 9, 10, 0),
        status: Status.CANCEL,
    },
    {
        title: Service.LAUNDRY,
        start: new Date(2023, 9, 9, 14, 0),
        end: new Date(2023, 9, 9, 15, 0),
        status: Status.DONE,
    },
    {
        title: Service.LAUNDRY,
        start: new Date(2023, 9, 10, 11, 0),
        end: new Date(2023, 9, 10, 13, 0),
        status: Status.INCOMING,
    },
    {
        title: Service.LAUNDRY,
        start: new Date(2023, 9, 11, 9, 0),
        end: new Date(2023, 9, 11, 11, 0),
        status: Status.INCOMING,
    },
    {
        title: Service.LAUNDRY,
        start: new Date(2023, 9, 12, 7, 0),
        end: new Date(2023, 9, 12, 9, 0),
        status: Status.PENDING,
    },
    {
        title: Service.LAUNDRY,
        start: new Date(2023, 9, 12, 12, 0),
        end: new Date(2023, 9, 12, 14, 0),
        status: Status.PROCESSING,
    },
];

export const eventStyleGetter = (event: Event) => {
    const OPACITY_40 = '64';
    const BORDER_STYLE = '2px solid ';

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
            borderRadius: 0,
        },
    };
};

export default events;
