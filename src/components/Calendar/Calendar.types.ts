import type { ServiceType } from '@/components/ServiceList/ServiceItem';
import { Status, GroupType } from '@/utils/enums';

export type Type = {
    serviceId: number;
    serviceTypeId: number;
    typeName: string;
};

export type Usages = {
    userUsageId: number;
    userId: number;
    serviceId: number;
    remaining: number;
    total: number;
    startDate: string;
    endDate: string;
    orderItemId: number;
    service: ServiceType;
    expired: true;
};

export type ScheduleDetail = {
    serviceName: string;
    customerId: number;
    cycle: string;
    endDate: string;
    note: string;
    onTask: boolean;
    parentScheduleId: number;
    phone: null;
    quantityRetrieve: number;
    scheduleId: number;
    serviceId: number;
    serviceTypeId: number;
    staff: null;
    staffId: number;
    startDate: string;
    status: string;
    type: Type[];
    usages: Usages[];
    userUsageId: number;
    currentUsage: Usages;
    groupType: GroupType;
};

type EventType = {
    title: string;
    start: Date;
    end: Date;
    status: Status;
    userName: string | null;
    phone: string | null;
    scheduleId: number;
};

export default EventType;

export interface FeedbackType {
    taskId: number;
    serviceId: number;
    rating: number;
    content: string | null;
}

export interface StaffInfoType {
    userId: number;
    proficiencyScore: number;
    avgRating: number;
    workingStatus: string;
    staffInfo: {
        userId: number;
        role: string;
        fullName: string;
        phoneNumber: string;
        emailAddress: string;
        emailValidationStatus: boolean;
        avatar: string | null;
        address: string | null;
    };
    banned: boolean;
}

interface CustomerInfoType {
    userId: number;
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    avatar: [
        {
            imageId: number;
            imageUrl: string;
            userId: number;
            entityId: number;
            imageType: string;
        },
    ];
}

type ImageObjType = {
    entityId: number;
    imageId: number;
    imageType: string;
    imageUrl: string;
    userId: number;
};

export interface ReportType {
    taskReportId: number;
    taskId: number;
    taskStatus: string;
    reportAt: string;
    note: string;
    taskReportImages: ImageObjType[];
}

export type ScheduleInfoType = {
    scheduleDetail: ScheduleDetail;
    staff: StaffInfoType | null;
    customer: CustomerInfoType | null;
    taskReportList: ReportType[];
    feedback: FeedbackType | null;
};

export type ReportSchedule = {
    service: {
        groupType: string;
        min: string;
        max: string;
        titleName: string;
    };

    staff: StaffInfoType | null;
    customer: CustomerInfoType;
    taskReportList: ReportType[];
    feedback: FeedbackType;
};
