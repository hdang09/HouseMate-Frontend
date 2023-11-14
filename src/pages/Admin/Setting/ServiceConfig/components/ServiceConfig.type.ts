import { ServiceConfigType } from '../../UnitConfig/components/UnitConfig.type';

export type ServiceConfigListType = {
    SERVICE_GROUPS: ServiceConfigType[];
    SERVICE_UNITS: ServiceConfigType[];
    BAD_STAFF_PROFICIENT_SCORE: ServiceConfigType[];
    PLUS_SCORE_PER_SUCCESS_TASK: ServiceConfigType[];
    DURATION_HOURS_CUSTOMER_SHOULD_NOT_CANCEL_TASK: ServiceConfigType[];
    DURATION_HOURS_SEND_INCOMING_NOTI_BEFORE: ServiceConfigType[];
    OFFICE_HOURS_END: ServiceConfigType[];
    FIND_STAFF_MINUTES: ServiceConfigType[];
    OFFICE_HOURS_START: ServiceConfigType[];
    DURATION_HOURS_SYST_AUTO_DONE_TASK: ServiceConfigType[];
    MINUS_POINTS_FOR_NOT_COMPLETE_REPORT_TASK: ServiceConfigType[];
    DURATION_HOURS_STAFF_SHOULD_NOT_CANCEL_TASK: ServiceConfigType[];
    DURATION_MINUTES_TIMES_STAFF_START_REPORT: ServiceConfigType[];
    MINUS_POINTS_FOR_STAFF_CANCEL_TASK: ServiceConfigType[];
    MINIMUM_RETURN_MINUTES: ServiceConfigType[];
    DURATION_HOURS_ALLOW_BAD_STAFF_PROFICENT_SCORE_APPLY: ServiceConfigType[];
    MINUS_POINTS_FOR_CUSTOMER_CANCEL_TASK: ServiceConfigType[];
};
