// import { RootState } from '@/store';

import generateInitialState, { InitialStateType, UsagesType } from './initialState';

import type { PayloadAction } from '@reduxjs/toolkit';
import { ServiceCategory } from '@/utils/enums';
import { TypeListType } from '@/components/CreateServiceModal/components/data-entry/InputService';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state

const category =
    (localStorage.getItem('groupType') as ServiceCategory) || ServiceCategory.HOURLY_SERVICE;

const initialState: InitialStateType = generateInitialState(category);

export const name = 'CreateSchedule';

export const scheduleSlice = createSlice({
    name,
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setServiceId: (state, action: PayloadAction<number>) => {
            state.serviceId = action.payload;
            state.schedule.serviceId = action.payload;
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
        setTypes: (state, action: PayloadAction<TypeListType[]>) => {
            state.types = action.payload;
        },
        setQuantity: (state, action: PayloadAction<number>) => {
            state.quantity = action.payload;
        },
        setUserUsage: (state, action: PayloadAction<UsagesType[]>) => {
            state.userUsage = action.payload;
        },
        setSchedule: (state, action) => {
            const { fieldName, value } = action.payload;
            state.schedule = {
                ...state.schedule,
                [fieldName]: value,
            };
        },
        resetSchedule: (state) => {
            state.serviceId = 0;
            state.date = '';
            state.timeRanges = [];
            state.cycle = '';
            state.note = '';
            state.pickUpDate = '';
            state.pickUpTime = '';
            state.receiveDate = '';
            state.receiveTime = '';
            state.time = '';
            state.types = [];
            state.quantity = 0;
            state.schedule = {};
        },
    },
});

export const {
    setServiceId,
    setDate,
    setTimeRanges,
    setCycle,
    setNote,
    setPickUpDate,
    setPickUpTime,
    setReceiveDate,
    setReceiveTime,
    setTime,
    setTypes,
    setQuantity,
} = scheduleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectSchedule = (state: RootState) => state.schedule

export default scheduleSlice.reducer;
