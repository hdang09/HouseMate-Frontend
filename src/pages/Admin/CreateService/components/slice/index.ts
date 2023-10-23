import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface serviceChildList {
    serviceID: string;
    quantity: number;
    price: number;
}

interface InitialStateType {
    periodPriceServiceList: {
        '3': number;
        '6': number;
        '9': number;
        '12': number;
    };
    originalPrice: number;
    finalPrice: number;
    groupType: string;
    titleName: string;
    description: string;
    typeNameList: string[];
    serviceChildList: serviceChildList[];
    UnitOfMeasure: string;
    isPackage: boolean;
}

const initialState: InitialStateType = {
    periodPriceServiceList: {
        '3': 0,
        '6': 0,
        '9': 0,
        '12': 0,
    },
    originalPrice: 0,
    finalPrice: 0,
    groupType: '',
    titleName: '',
    description: '',
    typeNameList: [],
    serviceChildList: [],
    UnitOfMeasure: '',
    isPackage: false,
};
// Define the initial state using that type
export const createServiceSlice = createSlice({
    name: 'createService',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        '3_MONTH': (state, action: PayloadAction<number>) => {
            state.periodPriceServiceList[3] = action.payload;
        },
        '6_MONTH': (state, action: PayloadAction<number>) => {
            state.periodPriceServiceList[6] = action.payload;
        },
        '9_MONTH': (state, action: PayloadAction<number>) => {
            state.periodPriceServiceList[9] = action.payload;
        },
        '12_MONTH': (state, action: PayloadAction<number>) => {
            state.periodPriceServiceList[12] = action.payload;
        },
        originalPrice: (state, action: PayloadAction<number>) => {
            state.originalPrice = action.payload;
        },
        finalPrice: (state, action: PayloadAction<number>) => {
            state.finalPrice = action.payload;
        },
        setGroupType: (state, action: PayloadAction<string>) => {
            state.groupType = action.payload;
        },
        setTitleName: (state, action: PayloadAction<string>) => {
            state.titleName = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setUnit: (state, action: PayloadAction<string>) => {
            state.UnitOfMeasure = action.payload;
        },
        setTypes: (state, action: PayloadAction<string[]>) => {
            state.typeNameList = action.payload;
        },
        setServiceChildList: (state, action: PayloadAction<serviceChildList>) => {
            state.serviceChildList.push({
                serviceID: action.payload.serviceID,
                quantity: action.payload.quantity,
                price: action.payload.price,
            });
        },
        setServiceIdChild: (state, action) => {
            const { index, serviceId, price } = action.payload;
            if (index >= state.serviceChildList.length || state.serviceChildList.length === 0) {
                state.serviceChildList.push({
                    serviceID: serviceId,
                    quantity: 1,
                    price: price,
                });
            } else {
                state.serviceChildList[index].serviceID = serviceId || '';
                state.serviceChildList[index].price = price;
            }
            state.originalPrice = state.serviceChildList.reduce((accumulator, child) => {
                return accumulator + child.price * child.quantity;
            }, 0);
        },
        setQuantityChild: (state, action) => {
            const { index, value } = action.payload;
            state.serviceChildList[index].quantity = value;
            state.originalPrice = state.serviceChildList.reduce((accumulator, child) => {
                return accumulator + child.price * child.quantity;
            }, 0);
        },
        setPriceChild: (state, action) => {
            const { index, value } = action.payload;
            state.serviceChildList[index].price = value;
        },
    },
});

export const { actions } = createServiceSlice;

export default createServiceSlice.reducer;
