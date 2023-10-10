// import { RootState } from '@/store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import generateInitialState, { InitialStateType } from './initialState';

// Define a type for the slice state

const serviceName = localStorage.getItem('serviceName') || 'cleaning-house';

const initialState: InitialStateType = generateInitialState(serviceName);

export const name = 'CreateSchedule';

export const scheduleSlice = createSlice({
    name,
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setServiceName: (state, action: PayloadAction<string>) => {
            state.serviceName = action.payload;
            state.schedule.serviceName = action.payload;
        },
        setDate: (state, action: PayloadAction<string>) => {
            state.schedule.date = action.payload;
        },
        setTimeRanges: (state, action: PayloadAction<[]>) => {
            state.schedule.timeRanges = action.payload;
        },
        setCycle: (state, action: PayloadAction<string>) => {
            state.schedule.cycle = action.payload;
        },
        setNote: (state, action: PayloadAction<string>) => {
            state.schedule.note = action.payload;
        },
        setPickUpDate: (state, action: PayloadAction<string>) => {
            state.schedule.pickUpDate = action.payload;
        },
        setPickUpTime: (state, action: PayloadAction<string>) => {
            state.schedule.pickUpTime = action.payload;
        },
        setReceiveDate: (state, action: PayloadAction<string>) => {
            state.receiveDate = action.payload;
        },
        setReceiveTime: (state, action: PayloadAction<string>) => {
            state.receiveTime = action.payload;
        },
        setTime: (state, action: PayloadAction<string>) => {
            state.time = action.payload;
        },
        setType: (state, action: PayloadAction<string>) => {
            state.type = action.payload;
        },
        setQuantity: (state, action: PayloadAction<number>) => {
            state.quantity = action.payload;
        },
        setSchedule: (state, action) => {
            const { fieldName, value } = action.payload;
            state.schedule = {
                ...state.schedule,
                [fieldName]: value,
                // serviceName: state.serviceName,
                // date: state.date,
                // timeRanges: state.timeRanges,
                // cycle: state.cycle,
                // note: state.note,
                // pickUpDate: state.pickUpDate,
                // pickUpTime: state.pickUpTime,
                // receiveDate: state.receiveDate,
                // receiveTime: state.receiveTime,
                // time: state.time,
                // type: state.type,
                // quantity: state.quantity,
            };
        },
        resetSchedule: (state) => {
            state.serviceName = '';
            state.date = '';
            state.timeRanges = [];
            state.cycle = '';
            state.note = '';
            state.pickUpDate = '';
            state.pickUpTime = '';
            state.receiveDate = '';
            state.receiveTime = '';
            state.time = '';
            state.type = '';
            state.quantity = 0;
            state.schedule = {};
        },
    },
});

export const {
    setServiceName,
    setDate,
    setTimeRanges,
    setCycle,
    setNote,
    setPickUpDate,
    setPickUpTime,
    setReceiveDate,
    setReceiveTime,
    setTime,
    setType,
    setQuantity,
} = scheduleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectSchedule = (state: RootState) => state.schedule

export default scheduleSlice.reducer;
