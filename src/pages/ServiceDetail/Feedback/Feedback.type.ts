import { ServiceType } from '@/components/ServiceList/ServiceItem';
import { Rating } from '@/utils/enums';

type ReviewPerRatingLevel = {
    [key: string]: number;
};

export type FeedbackOverview = {
    serviceID: number;
    avgRating: number;
    numOfReview: number;
    numOfReviewPerRatingLevel: ReviewPerRatingLevel;
};

export type FeedbackListItem = {
    serviceFeedbackId: number;
    service: ServiceType;
    taskId: number;
    customerId: number;
    customerName: string;
    content: string;
    createdAt: string;
    rating: number;
    avatar: string;
};

export type FeedbackType = {
    serviceID: number;
    feedbackList: FeedbackListItem[];
};

export type ProgressBarType = {
    id: Rating;
    label: string;
    star: Rating;
    quantity: number;
};
