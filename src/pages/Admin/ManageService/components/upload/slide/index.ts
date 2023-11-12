import { ServiceDetailType } from '@/pages/ServiceDetail/ServiceDetail.type';
import { GroupType, SaleStatus } from '@/utils/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType extends ServiceDetailType {
    imageUrls: [];
    imageId: number;
}
export const initialState: InitialStateType = {
    service: {
        serviceId: 0,
        titleName: '',
        originalPrice: 0,
        finalPrice: 0,
        unitOfMeasure: '',
        description: '',
        saleStatus: SaleStatus.ALL,
        groupType: GroupType.DELIVERY_SERVICE,
        avgRating: 0.0,
        numberOfSold: 0,
        min: 0,
        max: 0,
        images: [],
        numberOfReview: 0,
        numberOfComment: 0,
        package: true,
    },
    packageServiceItemList: [],
    priceList: [],
    imageUrls: [],
    imageId: 0,
};

export const name = 'upload';

export const uploadSlice = createSlice({
    name,
    initialState,
    reducers: {
        setImageUrls: (state, action) => {
            state.imageUrls = action.payload;
        },
        setServiceDetail: (state, action: PayloadAction<ServiceDetailType>) => {
            (state.service = action.payload.service),
                (state.priceList = action.payload.priceList),
                (state.typeList = action.payload.typeList),
                (state.packageServiceItemList = action.payload.packageServiceItemList);
        },
        setImageId: (state, action: PayloadAction<number>) => {
            state.imageId = action.payload;
        },
    },
});

export const { setImageUrls, setServiceDetail, setImageId } = uploadSlice.actions;

export default uploadSlice;
