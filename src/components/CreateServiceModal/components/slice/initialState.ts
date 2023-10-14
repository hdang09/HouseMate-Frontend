export interface ScheduleType {
    serviceId?: number;
    category?: string;
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
    category: string;
    date?: string;
    timeRanges?: any;
    cycle?: string;
    note?: string;
    pickUpDate?: string;
    pickUpTime?: string;
    receiveDate?: string;
    receiveTime?: string;
    time?: string;
    types?: string[];
    quantity?: number;
    schedule: ScheduleType;
}
const generateInitialState = (category: string) => {
    //TODO : wait for category in api
    switch (category) {
        case 'HOURLY_SERVICE':
            return {
                schedule: {},
                serviceName: '',
                category: '',
                types: [''],
                date: '',
                timeRanges: [],
                cycle: '',
                note: '',
            };
        case 'RETURN_SERVICE':
            return {
                schedule: {},
                serviceName: '',
                category: '',
                types: [''],
                pickUpDate: '',
                pickUpTime: '',
                receiveDate: '',
                receiveTime: '',
                cycle: '',
                note: '',
            };
        case 'DELIVERY_SERVICE':
            return {
                schedule: {},
                serviceName: '',
                category: '',
                date: '',
                time: '',
                types: [''],
                quantity: 0,
                cycle: '',
                note: '',
            };
        default:
            return {
                schedule: {},
                types: [''],
                serviceName: '',
                category: '',
                date: '',
                timeRanges: [],
                cycle: '',
                note: '',
            };
    }
};

export default generateInitialState;
