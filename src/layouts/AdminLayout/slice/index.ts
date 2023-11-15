import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState = {
    titleHeader: 'Trang chủ',
};

export const name = 'title';

export const headerSlice = createSlice({
    name,
    initialState,
    reducers: {
        changeTitle: (state, action: PayloadAction<string>) => {
            state.titleHeader = action.payload;
        },
    },
});

export const { changeTitle } = headerSlice.actions;

export default headerSlice.reducer;
