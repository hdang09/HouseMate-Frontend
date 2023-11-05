import { scheduleSlice } from '@/components/ServiceModal/components/slice';
import { cartSlice } from '@/layouts/MainLayout/slice';
import { serviceSlice } from '@/pages/ServiceDetail/slice';
import { headerSlice } from '@/layouts/AdminLayout/slice';
import { configureStore } from '@reduxjs/toolkit';
import { createServiceSlice } from '@/pages/Admin/CreateService/components/slice';
import { uploadSlice } from '@/pages/Admin/CreateService/components/upload/slide';
import { scheduleInfoSlice } from '@/components/Calendar/slide';
export const store = configureStore({
    reducer: {
        schedules: scheduleSlice.reducer,
        service: serviceSlice.reducer,
        header: headerSlice.reducer,
        createService: createServiceSlice.reducer,
        cart: cartSlice.reducer,
        upload: uploadSlice.reducer,
        scheduleInfoSlice: scheduleInfoSlice.reducer,
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
