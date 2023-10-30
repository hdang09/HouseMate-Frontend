import { ServiceCategory } from '@/utils/enums';
import { TypeListType } from '@/components/CreateServiceModal/components/data-entry/InputService';
import { ServiceType } from '@/components/ServiceList/ServiceItem';

export interface ScheduleType {
    serviceId?: number;
    groupType?: string;
    date?: string;
    timeRanges?: any;
    cycle?: string;
    note?: string;
    pickUpDate?: string;
    pickUpTime?: string;
    receiveDate?: string;
    receiveTime?: string;
    time?: string;
    type?: string;
    quantity?: number;
    userUsageId?: number;
}

export interface UsagesType {
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
}

export interface InitialStateType {
    serviceId?: number;
    groupType: string;
    date?: string;
    timeRanges?: any;
    cycle?: string;
    note?: string;
    pickUpDate?: string;
    pickUpTime?: string;
    receiveDate?: string;
    receiveTime?: string;
    time?: string;
    types?: TypeListType[];
    quantity?: number;
    schedule: ScheduleType;
    userUsage: UsagesType[];
}
const generateInitialState = (category: ServiceCategory) => {
    //TODO : wait for category in api
    switch (category) {
        case `${ServiceCategory.HOURLY_SERVICE}`:
            return {
                schedule: {},
                serviceName: '',
                groupType: '',
                types: [],
                date: '',
                timeRanges: [],
                cycle: '',
                note: '',
                userUsage: [],
            };
        case `${ServiceCategory.RETURN_SERVICE}`:
            return {
                schedule: {},
                serviceName: '',
                groupType: '',
                types: [],
                pickUpDate: '',
                pickUpTime: '',
                receiveDate: '',
                receiveTime: '',
                cycle: '',
                note: '',
                userUsage: [],
            };
        case `${ServiceCategory.DELIVERY_SERVICE}`:
            return {
                schedule: {},
                serviceName: '',
                groupType: '',
                date: '',
                time: '',
                types: [],
                quantity: 0,
                cycle: '',
                note: '',
                userUsage: [],
            };
        default:
            return {
                schedule: {},
                types: [],
                serviceName: '',
                groupType: '',
                date: '',
                timeRanges: [],
                cycle: '',
                note: '',
                userUsage: [],
            };
    }
};

export default generateInitialState;
