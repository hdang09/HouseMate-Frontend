import ImgCrop from 'antd-img-crop';
import { useState } from 'react';
import { Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';
import { FormType } from '../../CreateService';
import { useAppDispatch } from '@/hooks';
import uploadSlice from './slide';

type UploadImgProps = {
    form: FormType;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
};

const UploadImg = ({ form, onFinish, onFinishFailed }: UploadImgProps) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
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
                        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
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
