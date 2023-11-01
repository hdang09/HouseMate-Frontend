import { get, post } from './apiCaller';

// interface ScheduleDTO {
//     serviceId: number;
//     groupType: string;
//     cycle: CycleEnum;
//     note: string;
//     typeId: number;
//     quantityRetrieve: number;
//     startDate: string;
//     endDate: string;
//     userUsageId: number;
// }

export const getCustomerEvents = () => {
    return get(`/schedule/customer`);
};

export const getCurrentStaffEvents = () => {
    return get(`/schedule/staff`);
};

export const getStaffEventsById = (staffId: number) => {
    return get(`/schedule/staff/${staffId}`);
};

export const getAllPurchased = () => {
    return get('/schedule/all-purchased');
};

export const createSchedule = (schedule: object) => {
    return post('/schedule/create', schedule);
};
