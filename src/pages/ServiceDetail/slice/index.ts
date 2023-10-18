import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ServiceState {
    serviceId: number;
}

const initialState: ServiceState = {
    serviceId: 0,
};

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setServiceId: (state, action: PayloadAction<number>) => {
            state.serviceId = action.payload;
        },
    },
});

export const { setServiceId: incrementByAmount } = serviceSlice.actions;

export default serviceSlice.reducer;
