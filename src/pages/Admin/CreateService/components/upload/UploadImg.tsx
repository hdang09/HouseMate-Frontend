import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';
import { FormType } from '../../CreateService';
import { useAppDispatch } from '@/hooks';
import uploadSlice from './slide';

type UploadImgProps = {
    form: FormType;
    fileList: UploadFile[];
    setFileList: (fileList: UploadFile[]) => void;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
};

const UploadImg = ({ fileList, setFileList, form, onFinish, onFinishFailed }: UploadImgProps) => {
    const dispatch = useAppDispatch();
    const beforeUpload = () => {
        return false;
    };

    const onChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        const imageList = newFileList.map((file) => file.originFileObj);
        dispatch(uploadSlice.actions.setImageUrls(imageList));
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
