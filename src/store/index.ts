import scheduleReducer from '@/components/ServiceModal/components/slice';
import cartReducer from '@/layouts/MainLayout/slice';
import serviceReducer from '@/pages/ServiceDetail/slice';
import headerReducer from '@/layouts/AdminLayout/slice';
import { configureStore } from '@reduxjs/toolkit';
import createServiceReducer from '@/pages/Admin/ManageService/components/slice';
import uploadReducer from '@/pages/Admin/ManageService/components/upload/slide';
import scheduleInfoReducer from '@/components/Calendar/slice';
import authReducer from '@/pages/Login/Login.slice';

export const store = configureStore({
    reducer: {
        schedules: scheduleReducer,
        service: serviceReducer,
        header: headerReducer,
        createService: createServiceReducer,
        cart: cartReducer,
        upload: uploadReducer,
        scheduleInfo: scheduleInfoReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
