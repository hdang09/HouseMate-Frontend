import { post } from './apiCaller';

export const uploadImageList = (fileList: any[], imageType: string, entityId: number) => {
    const formData = new FormData();
    fileList.map((file) => {
        formData.append('file', file);
    });
    formData.append('imageType', imageType);
    formData.append('entityId', entityId.toString());
    return post('/upload', formData, {}, { 'Content-Type': 'multipart/form-data' });
};
