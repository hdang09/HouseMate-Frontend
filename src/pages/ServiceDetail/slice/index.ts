import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ServiceState {
    serviceId: number;
    commentLength: number;
}

const initialState: ServiceState = {
    serviceId: 0,
    commentLength: 0,
};

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setServiceId: (state, action: PayloadAction<number>) => {
            state.serviceId = action.payload;
        },
        setCommentLength: (state, action: PayloadAction<number>) => {
            state.commentLength = action.payload;
        },
        increaseCommentLength: (state) => {
            state.commentLength++;
        },
        decreaseCommentLength: (state) => {
            state.commentLength--;
        },
    },
});

export const { setServiceId, setCommentLength, increaseCommentLength, decreaseCommentLength } =
    serviceSlice.actions;

export default serviceSlice.reducer;
