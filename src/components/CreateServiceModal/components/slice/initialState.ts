import { ServiceCategory } from '@/utils/enums';
import { TypeListType } from '@/components/CreateServiceModal/components/data-entry/InputService';

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
}
const generateInitialState = (category: ServiceCategory) => {
    //TODO : wait for category in api
    switch (category) {
        case ServiceCategory.HOURLY_SERVICE:
            return {
                schedule: {},
                serviceName: '',
                groupType: '',
                types: [],
                date: '',
                timeRanges: [],
                cycle: '',
                note: '',
            };
        case ServiceCategory.RETURN_SERVICE:
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
            };
        case ServiceCategory.DELIVERY_SERVICE:
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
            };
    }
};

export default generateInitialState;
