import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ScheduleInfoType } from '../Calendar.types';

export const initialState = {
    serviceScheduleId: 0,
    parentScheduleId: 0,
    serviceId: 0,
    titleName: '',
    groupType: '',
    startDate: '',
    endDate: '',
    cycle: '',
    note: "'",
    serviceTypeId: 0,
    typeName: '',
    status: '',
    usage: {
        userUsageId: 0,
        titleName: '',
    },
    quantityRetrieve: 0,
    customer: {
        userId: 0,
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        avatar: [
            {
                imageId: 0,
                imageUrl: '',
                userId: 0,
                entityId: 0,
                imageType: '',
            },
        ],
    },
    staff: {
        userId: 0,
        profiencyScore: 0,
        avgRating: 0,
        workingStatus: '',
        staffInfo: {
            userId: 0,
            role: '',
            fullName: '',
            phoneNumber: '',
            emailAddress: '',
            emailValidationStatus: false,
            avatar: '',
            address: '',
        },
        banned: false,
    },
    taskReportList: [
        {
            taskReportId: 0,
            taskId: 0,
            taskStatus: '',
            reportAt: '',
            note: '',
            taskReportImages: 0,
        },
    ],

    feedback: { taskId: 0, serviceId: 0, rating: 0, content: null },
};

export const name = 'scheduleInfo';

export const scheduleInfoSlice = createSlice({
    name,
    initialState,
    reducers: {
        setScheduleInfo: (state, action: PayloadAction<ScheduleInfoType>) => {
            (state.serviceScheduleId = action.payload.serviceScheduleId),
                (state.parentScheduleId = action.payload.parentScheduleId),
                (state.serviceId = action.payload.serviceId),
                (state.titleName = action.payload.titleName),
                (state.groupType = action.payload.groupType),
                (state.startDate = action.payload.startDate),
                (state.endDate = action.payload.endDate),
                (state.cycle = action.payload.cycle),
                (state.note = action.payload.note),
                (state.serviceTypeId = action.payload.serviceTypeId),
                (state.typeName = action.payload.typeName),
                (state.status = action.payload.status),
                (state.usage = action.payload.usage),
                (state.quantityRetrieve = action.payload.quantityRetrieve),
                (state.customer = action.payload.customer);
        },
        setStaff: (state, action) => {
            state.staff = action.payload;
        },
        setTaskReportList: (state, action) => {
            state.taskReportList = action.payload;
        },
    },
});

export const { setScheduleInfo, setStaff, setTaskReportList } = scheduleInfoSlice.actions;

export default scheduleInfoSlice;
