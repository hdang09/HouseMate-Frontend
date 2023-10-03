export interface ScheduleType {
    serviceName?: string;
    date?: string;
    timeRanges?: TimeRanges[];
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

type TimeRanges = {
    timeRanges: string;
};
export interface InitialStateType {
    serviceName?: string;
    date?: string;
    timeRanges?: TimeRanges[];
    cycle?: string;
    note?: string;
    pickUpDate?: string;
    pickUpTime?: string;
    receiveDate?: string;
    receiveTime?: string;
    time?: string;
    type?: string;
    quantity?: number;
    schedule: ScheduleType;
}
const generateInitialState = (serviceName: string) => {
    switch (serviceName) {
        case 'cleaning-house':
            return {
                schedule: {},
                serviceName: '',
                date: '',
                timeRanges: [],
                cycle: '',
                note: '',
            };
        case 'laundry':
            return {
                schedule: {},
                serviceName: '',
                pickUpDate: '',
                pickUpTime: '',
                receiveDate: '',
                receiveTime: '',
                cycle: '',
                note: '',
            };
        case 'water-delivery':
            return {
                schedule: {},
                serviceName: '',
                date: '',
                time: '',
                type: '',
                quantity: 0,
                cycle: '',
                note: '',
            };
        case 'rice-delivery':
            return {
                schedule: {},
                serviceName: '',
                date: '',
                time: '',
                type: '',
                quantity: 0,
                cycle: '',
                note: '',
            };
        default:
            return {
                schedule: {},
                serviceName: '',
                date: '',
                timeRanges: [],
                cycle: '',
                note: '',
            };
    }
};

export default generateInitialState;
