import { Status } from '@/utils/enums';

type EventType = {
    title: string;
    start: Date;
    end: Date;
    status: Status;
    staff: string | null;
    phone: string | null;
};

export default EventType;
