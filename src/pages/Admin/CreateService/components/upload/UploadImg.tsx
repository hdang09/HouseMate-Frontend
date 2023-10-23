// import React, { useState } from 'react';
import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
// import type { UploadFile } from 'antd/es/upload/interface';
import { FormType } from '@/pages/Admin/CreateService/CreateService';

// const getBase64 = (file: RcFile): Promise<string> =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result as string);
//         reader.onerror = (error) => reject(error);
//     });

type UploadImgProps = {
    form: FormType;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
};

const UploadImg = ({ form, onFinish, onFinishFailed }: UploadImgProps) => {
    const handleFileUpload = (file: RcFile) => {
        const reader = new FileReader();
        //TODO: WAITNG FOR API UPLOAD PHOTO
        // const fileExtension = file.name.split('.').pop();

        // //  if (fileExtension.toLowerCase() !== ('jpg' || 'jpeg' || 'png')) {
        // //      toastError('Error: Invalid file format. Only image files are allowed.');
        // //      return;
        // //  }

        // reader.onload = (e: ProgressEvent<FileReader>) => {
        //     // const base64String = btoa(e.target?.result);
        //     // console.log(`data:image/jpeg;base64,${base64String}`);
        // };

        reader.readAsBinaryString(file);
        //  setOpen(false);
    };
    return (
        <Styled.ServiceDetailForm
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            name="upload"
        >
            <Styled.ServiceDetailForm.Item>
                <Upload.Dragger
                    beforeUpload={(file) => {
                        handleFileUpload(file);
                        return false; // Prevent file upload to the server
                    }}
                >
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload.Dragger>
            </Styled.ServiceDetailForm.Item>
        </Styled.ServiceDetailForm>
    );
};

export default UploadImg;
