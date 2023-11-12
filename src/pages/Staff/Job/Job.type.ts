import { CycleEnum, ImageEnum, Rating, Role, Status, TaskStatus } from '@/utils/enums';
import { PageAbleType, SortType } from '@/pages/Shop/Shop.type';
import { ImageType } from '@/pages/ServiceDetail/ServiceDetail.type';

export type TaskFeedbackType = {
    serviceFeedbackId: number;
    serviceId: number;
    taskId: number;
    customerId: number;
    rating: Rating;
    content: string;
    createdAt: string;
};

export type TaskReportImageType = {
    imageId: number;
    imageUrl: string;
    userId: number;
    entityId: number;
    imageType: ImageEnum;
};

export type ReportTaskType = {
    taskReportId: number;
    taskId: number;
    taskStatus: TaskStatus;
    reportAt: string;
    note: string;
    taskReportImages: TaskReportImageType[];
    quantityRemainder: number;
    qutyRemainderPayment: number;
};

export type ServiceType = {
    serviceId: number;
    titleName: string;
    packageName: string;
    unitOfMeasure: string;
    groupType: string;
    min: number;
    max: number;
    serviceType: string;
    images: ImageType[];
    package: boolean;
};

export type CustomerInfo = {
    userId: number;
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    avatar: string[];
};

export type ScheduleType = {
    scheduleId: number;
    serviceId: number;
    serviceTypeId: number;
    customerId: number;
    staffId: number;
    quantityRetrieve: number;
    startDate: string;
    endDate: string;
    note: string;
    cycle: CycleEnum;
    status: Status;
    parentScheduleId: number;
    userUsageId: number;
    onTask: boolean;
    staff: StaffInfo;
    phone: string;
};

export type StaffInfo = {
    userId: number;
    role: typeof Role;
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    emailValidationStatus: boolean;
    avatar: string;
    address: string;
};

export type JobItemType = {
    taskId: number;
    createdAt: string;
    taskStatus: TaskStatus;
    addressWorking: string;
    taskNote: string;
    receivedAt: string;
    staff: StaffInfo;
    schedule: ScheduleType;
    customer: CustomerInfo;
    service: ServiceType;
    taskReportList: ReportTaskType[];
    feedback: TaskFeedbackType;
};

export type JobType = {
    content: JobItemType[];
    pageable: PageAbleType;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: SortType;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
};
