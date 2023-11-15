import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedbackType, ScheduleInfoType } from '../Calendar.types';
import { GroupType, SaleStatus, UnitOfMeasure } from '@/utils/enums';

export interface serviceChildList {
    serviceID: string;
    quantity: number;
    price: number;
}

const initialState: ScheduleInfoType = {
    scheduleDetail: {
        groupType: GroupType.DELIVERY_SERVICE,
        serviceName: '',
        customerId: 0,
        cycle: '',
        endDate: '',
        note: '',
        onTask: false,
        parentScheduleId: 0,
        phone: null,
        quantityRetrieve: 0,
        scheduleId: 0,
        serviceId: 0,
        serviceTypeId: 0,
        staff: null,
        staffId: 0,
        startDate: '',
        status: '',
        type: [],
        usages: [],
        userUsageId: 0,
        finalPrice: 0,
        currentUsage: {
            userUsageId: 0,
            userId: 0,
            serviceId: 0,
            remaining: 0,
            total: 0,
            startDate: '',
            endDate: '',
            orderItemId: 0,
            service: {
                serviceId: 0,
                titleName: '',
                originalPrice: 0,
                finalPrice: 0,
                unitOfMeasure: UnitOfMeasure.KG,
                description: '',
                saleStatus: SaleStatus.AVAILABLE,
                groupType: GroupType.DELIVERY_SERVICE,
                avgRating: 0,
                numberOfSold: 0,
                min: 0,
                max: 0,
                images: [],
                package: true,
            },
            expired: true,
        },
    },
    staff: null,
    customer: null,
    taskReportList: [],
    feedback: { taskId: 0, serviceId: 0, rating: 0, content: null },
};
// Define the initial state using that type
export const ScheduleInfoSlice = createSlice({
    name: 'ScheduleInfo',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setScheduleInfo: (state, action: PayloadAction<ScheduleInfoType>) => {
            state.customer = action.payload.customer;
            state.feedback = action.payload.feedback;
            state.scheduleDetail = action.payload.scheduleDetail;
            state.staff = action.payload.staff;
            state.taskReportList = action.payload.taskReportList;
        },

        setFeedback: (state, action: PayloadAction<FeedbackType>) => {
            state.feedback = action.payload;
        },

        reset: (state) => {
            (state.scheduleDetail = {
                finalPrice: 0,
                groupType: GroupType.DELIVERY_SERVICE,
                serviceName: '',
                customerId: 0,
                cycle: '',
                endDate: '',
                note: '',
                onTask: false,
                parentScheduleId: 0,
                phone: null,
                quantityRetrieve: 0,
                scheduleId: 0,
                serviceId: 0,
                serviceTypeId: 0,
                staff: null,
                staffId: 0,
                startDate: '',
                status: '',
                type: [],
                usages: [],
                userUsageId: 0,
                currentUsage: {
                    userUsageId: 0,
                    userId: 0,
                    serviceId: 0,
                    remaining: 0,
                    total: 0,
                    startDate: '',
                    endDate: '',
                    orderItemId: 0,
                    service: {
                        serviceId: 0,
                        titleName: '',
                        originalPrice: 0,
                        finalPrice: 0,
                        unitOfMeasure: UnitOfMeasure.KG,
                        description: '',
                        saleStatus: SaleStatus.AVAILABLE,
                        groupType: GroupType.DELIVERY_SERVICE,
                        avgRating: 0,
                        numberOfSold: 0,
                        min: 0,
                        max: 0,
                        images: [],
                        package: true,
                    },
                    expired: true,
                },
            }),
                (state.staff = null);
            state.customer = null;
            state.taskReportList = [];
            state.feedback = { taskId: 0, serviceId: 0, rating: 0, content: null };
        },
    },
});

export const { actions } = ScheduleInfoSlice;

export default ScheduleInfoSlice.reducer;
