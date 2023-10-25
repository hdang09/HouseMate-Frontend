import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    imageUrls: [],
};

export const name = 'upload';

export const uploadSlice = createSlice({
    name,
    initialState,
    reducers: {
        setImageUrls: (state, action) => {
            state.imageUrls = action.payload;
        },
    },
});

export const { setImageUrls } = uploadSlice.actions;

export default uploadSlice;
