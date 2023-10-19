import React, { useState } from 'react';
import * as Styled from '@/pages/Admin/CreateSingleService/CreateSingleService.styled';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { FormType } from '@/pages/Admin/CreateSingleService/CreateSingleService';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

type UploadImgProps = {
    form: FormType;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
};

const UploadImg = ({ form, onFinish, onFinishFailed }: UploadImgProps) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
            console.log('URL of the last uploaded file:', file.preview);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        // Get the URL of the last uploaded file (if it exists)
        const lastUploadedFile = newFileList[newFileList.length - 1];
        if (lastUploadedFile && lastUploadedFile.url) {
            // Access the URL of the last uploaded file
        }
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <Styled.ServiceDetailForm
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            name="upload"
        >
            <Styled.ServiceDetailForm.Item>
                <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    name="upload"
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Styled.ServiceDetailForm.Item>
        </Styled.ServiceDetailForm>
    );
};

export default UploadImg;
