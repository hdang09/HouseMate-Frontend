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

export interface FeedbackType {
    taskId: number;
    serviceId: number;
    rating: number;
    content: string | null;
}

export interface StaffInfoType {
    userId: number;
    profiencyScore: number;
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

export interface ReportType {
    taskReportId: number;
    taskId: number;
    taskStatus: string;
    reportAt: string;
    note: string;
    taskReportImages: string[];
}

export type ScheduleInfoType = {
    serviceScheduleId: number;
    parentScheduleId: number;
    serviceId: number;
    titleName: string;
    groupType: string;
    cycle: string;
    note: string;
    serviceTypeId: number;
    typeName: string;
    quantityRetrieve: number;
    startDate: string;
    endDate: string;
    status: string;
    usage: {
        userUsageId: number;
        titleName: string;
    };
    staff: StaffInfoType | null;
    customer: CustomerInfoType;
    taskReportList: ReportType[];
    feedback: FeedbackType;
};
