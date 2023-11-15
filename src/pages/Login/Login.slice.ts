import cookieUtils from '@/utils/cookieUtils';
import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

export interface JwtType {
    payload: {
        id: number;
        fullName: string;
        email: string;
        role: string;
    };
    iat: number;
    exp: number;
}

const jwt: JwtType | string = cookieUtils.getToken() && jwtDecode(cookieUtils.getToken());

const initialState = {
    role: typeof jwt === 'string' ? undefined : jwt?.payload?.role,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            const jwt: JwtType = jwtDecode(cookieUtils.getToken());
            const { role } = jwt?.payload;
            state.role = role;
        },
    },
});

// Actions
export const { login } = authSlice.actions;

// Reducer
export default authSlice.reducer;
