import { Avatar, Button, Flex, Form, Modal, Spin, Typography, Upload, notification } from 'antd';
import {
    ExclamationCircleOutlined,
    Loading3QuartersOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { UploadFile } from 'antd/lib';
import { UploadChangeParam } from 'antd/lib/upload';
import { RcFile } from 'antd/es/upload';
import ImgCrop from 'antd-img-crop';
import { useRef, useState } from 'react';
import dayjs from 'dayjs';

import { useDocumentTitle } from '@/hooks';
import { createStaffAccount, uploadAvatar } from '@/utils/accountAPI';

import * as St from './CreateStaff.styled';
import { fields } from './CreateStaff.fields';

const { Title } = Typography;

const CreateStaff = () => {
    useDocumentTitle('Tạo Tài Khoản Nhân Viên | HouseMate');

    const [form] = Form.useForm();
    const [modal, contextHolderModal] = Modal.useModal();
    const [api, contextHolderNotification] = notification.useNotification();
    const [loading, setLoading] = useState<boolean>(false);
    const file = useRef<UploadFile>();
    const [imageUrl, setImageUrl] = useState<string>();
    const fieldComponents = useRef<JSX.Element[]>([]);
    const [fullName, setFullName] = useState<string>('Tên nhân viên');

    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn có muốn tạo hồ sơ nhân viên này?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Quay lại',
            onCancel: form.submit,
            cancelText: 'Xác nhận',
        });
    };

    const beforeUpload = (f: RcFile) => {
        file.current = f;
        return false;
    };

    const handleUploadAvatar = (info: UploadChangeParam<UploadFile<any>>) => {
        setImageUrl(URL.createObjectURL(info.file as RcFile));
    };

    const handleFormChange = (values: any) => {
        const { fullName } = values;

        if (fullName === '') {
            setFullName('Tên nhân viên');
        }

        if (fullName) setFullName(fullName.trim());
    };

    const handleCreateStaff = async (values: any) => {
        try {
            setLoading(true);

            if (!file.current)
                return api.warning({
                    message: 'Cảnh báo',
                    description: 'Bạn chưa chọn ảnh đại diện cho nhân viên.',
                });

            const { data } = await createStaffAccount({
                ...values,
                dateOfBirth: dayjs(values.dateOfBirth).add(7, 'hours'),
            });
            await uploadAvatar(data, file.current as RcFile);

            api.success({
                message: 'Thành công',
                description: 'Bạn đã tạo tài khoản thành công',
            });
        } catch (error: any) {
            api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreateFailed = (values: any) => {
        console.log(values);
    };

    return (
        <>
            {contextHolderNotification}

            <Spin spinning={loading} tip="Đang tải...">
                <Flex wrap="wrap" gap={30} align="flex-start">
                    <St.ImgWrapper vertical align="center" justify="center">
                        <ImgCrop quality={1} rotationSlider aspectSlider showReset showGrid>
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleUploadAvatar}
                            >
                                {imageUrl ? (
                                    <Avatar src={imageUrl} size={90} />
                                ) : (
                                    <Avatar icon={<UserOutlined />} size={90} />
                                )}
                            </Upload>
                        </ImgCrop>

                        <Title level={1}>{fullName}</Title>

                        <St.Actions gap={8}>
                            <Button block type="primary" onClick={confirm}>
                                {loading ? (
                                    <Loading3QuartersOutlined spin style={{ fontSize: '1.6rem' }} />
                                ) : (
                                    'Tạo tài khoản'
                                )}
                            </Button>
                        </St.Actions>
                    </St.ImgWrapper>

                    <St.StaffInfoWrapper vertical gap={18} flex={1}>
                        <Title level={2}>Thông tin cá nhân</Title>

                        <Form
                            form={form}
                            onFinish={handleCreateStaff}
                            onFinishFailed={handleCreateFailed}
                            onValuesChange={handleFormChange}
                            layout="vertical"
                            autoComplete="off"
                        >
                            {fields.map((field) => {
                                if (fieldComponents.current.length === 2)
                                    fieldComponents.current = [];

                                const component = (
                                    <Form.Item
                                        key={field.key}
                                        label={field.label}
                                        name={field.name}
                                        initialValue={field.initialValue}
                                        rules={field.rules}
                                        required
                                        style={
                                            field.halfWidth ? { width: '50%' } : { width: '100%' }
                                        }
                                    >
                                        {field.component}
                                    </Form.Item>
                                );

                                if (field.halfWidth) {
                                    fieldComponents.current.push(component);

                                    if (fieldComponents.current.length !== 2) return;
                                }

                                return fieldComponents.current.length === 2 ? (
                                    <Flex gap={12} key={field.key}>
                                        {fieldComponents.current.map((component) => component)}
                                    </Flex>
                                ) : (
                                    component
                                );
                            })}
                        </Form>
                    </St.StaffInfoWrapper>
                </Flex>
            </Spin>

            {contextHolderModal}
        </>
    );
};

export default CreateStaff;
