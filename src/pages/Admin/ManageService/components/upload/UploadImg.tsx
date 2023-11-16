import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

import * as Styled from '@/pages/Admin/ManageService/CreateService.styled';
import { FormType } from '../../CreateService';
import { useAppDispatch } from '@/hooks';
import uploadSlice from './slide';
import { deleteImage, uploadImageList } from '@/utils/uploadAPI';
import { NotificationInstance } from 'antd/es/notification/interface';
import { ImageEnum, ModalEnum } from '@/utils/enums';
import { useParams } from 'react-router-dom';

type UploadImgProps = {
    form: FormType;
    fileList: UploadFile[];
    setFileList: (fileList: UploadFile[]) => void;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
    variant: string;
    api: NotificationInstance;
};

const UploadImg = ({
    fileList,
    setFileList,
    form,
    onFinish,
    onFinishFailed,
    api,
    variant,
}: UploadImgProps) => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const beforeUpload = () => {
        return false;
    };
    const onChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        const deletedFile = fileList.find(
            (originalFile) => !newFileList.some((newFile) => newFile.uid === originalFile.uid),
        );

        // If the deletedFile is found, you can access its URL
        if (deletedFile) {
            console.log('Deleted File URL:', deletedFile);
            dispatch(uploadSlice.actions.setImageId(+deletedFile.uid));
            try {
                await deleteImage(+deletedFile.uid);
                api.success({
                    message: 'Success',
                    description: 'Xóa thành công',
                });
            } catch (error: any) {
                api.error({
                    message: 'Error',
                    description: error.response ? error.response.data : error.message,
                });
                console.log(error);
            }
        } else {
            const imageList = newFileList.map((file) => file.originFileObj);
            dispatch(uploadSlice.actions.setImageUrls(imageList));
            if (variant === ModalEnum.VIEW) {
                try {
                    await uploadImageList(imageList, ImageEnum.SERVICE, Number.parseInt(id || '0'));
                    api.success({
                        message: 'Success',
                        description: 'Thêm ảnh thành công',
                    });
                } catch (error: any) {
                    api.error({
                        message: 'Error',
                        description: error.response ? error.response.data : error.message,
                    });
                    console.log(error);
                }
            }
        }
        setFileList(newFileList);
    };

    return (
        <Styled.ServiceDetailForm
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            name="upload"
        >
            <Styled.ServiceDetailForm.Item>
                <ImgCrop rotationSlider>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        beforeUpload={beforeUpload}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </ImgCrop>
            </Styled.ServiceDetailForm.Item>
        </Styled.ServiceDetailForm>
    );
};

export default UploadImg;
