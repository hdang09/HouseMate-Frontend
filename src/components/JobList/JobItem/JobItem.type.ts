import { Status } from '@/utils/enums';

export type JobItemProps = {
    jobId: number;
    serviceImage: string;
    serviceName: string;
    serviceChildrenName: string;
    time: string;
    address: string;
    createAt?: string;
    status?: Status;
};
