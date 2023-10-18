import { Status } from '@/utils/enums';

export type JobItemProps = {
    jobId: number;
    serviceImage: string;
    serviceName: string;
    serviceChildrenName: string;
    time: string;
    address: string;
    createAt?: string;
    startDate?: string;
    endDate?: string;
    status?: Status;
    package?: boolean;
    note?: string;
};
