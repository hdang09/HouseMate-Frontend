import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface SingleServiceState {
    '3_MONTH': number;
    '6_MONTH': number;
    '9_MONTH': number;
    '12_MONTH': number;
    originalPrice: number;
    finalPrice: number;
    category: string;
    serviceName: string;
    description: string;
    types: string[];
    unit: string;
}

// Define the initial state using that type
const initialState: SingleServiceState = {
    '3_MONTH': 0,
    '6_MONTH': 0,
    '9_MONTH': 0,
    '12_MONTH': 0,
    originalPrice: 0,
    finalPrice: 0,
    category: '',
    serviceName: '',
    description: '',
    types: [],
    unit: '',
};

export const singleServiceSlice = createSlice({
    name: 'singleService',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        '3_MONTH': (state, action: PayloadAction<number>) => {
            state['3_MONTH'] = action.payload;
        },
        '6_MONTH': (state, action: PayloadAction<number>) => {
            state['6_MONTH'] = action.payload;
        },
        '9_MONTH': (state, action: PayloadAction<number>) => {
            state['9_MONTH'] = action.payload;
        },
        '12_MONTH': (state, action: PayloadAction<number>) => {
            state['12_MONTH'] = action.payload;
        },
        originalPrice: (state, action: PayloadAction<number>) => {
            state.originalPrice = action.payload;
        },
        finalPrice: (state, action: PayloadAction<number>) => {
            state.finalPrice = action.payload;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setServiceName: (state, action: PayloadAction<string>) => {
            state.serviceName = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setUnit: (state, action: PayloadAction<string>) => {
            state.unit = action.payload;
        },
        setTypes: (state, action: PayloadAction<string[]>) => {
            state.types = action.payload;
        },
    },
});

export const { actions } = singleServiceSlice;

export default singleServiceSlice.reducer;
