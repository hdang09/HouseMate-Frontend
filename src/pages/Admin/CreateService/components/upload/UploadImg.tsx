// import React, { useState } from 'react';
import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';
import ImgCrop from 'antd-img-crop';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Image, Upload, notification } from 'antd';
import { FormType } from '@/pages/Admin/CreateService/CreateService';
import { useState } from 'react';
// import { PlusOutlined } from '@ant-design/icons';

type UploadImgProps = {
    form: FormType;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
};

const UploadImg = ({ form, onFinish, onFinishFailed }: UploadImgProps) => {
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            notification.success({
                message: 'Success',
                description: 'You can only upload JPG/PNG file!',
            });
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            notification.error({
                message: 'Error',
                description: 'Image must smaller than 2MB!',
            });
        }
        return isJpgOrPng && isLt2M;
    };
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        // TODO: Waiting API from server...
        setImageUrl(URL.createObjectURL(info.file.originFileObj as RcFile));

        if (info.file.status === 'done') {
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            setImageUrl(imageUrl);
        }
    };
    return (
        <Styled.ServiceDetailForm
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            name="upload"
        >
            <Styled.ServiceDetailForm.Item>
                <ImgCrop quality={1} rotationSlider aspectSlider showReset showGrid>
                    <Upload
                        name="images"
                        listType="picture-card"
                        className="avatar-uploader"
                        fileList={fileList}
                        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl && <Image src={imageUrl} />}
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>
                </ImgCrop>
            </Styled.ServiceDetailForm.Item>
        </Styled.ServiceDetailForm>
    );
};

export default UploadImg;
