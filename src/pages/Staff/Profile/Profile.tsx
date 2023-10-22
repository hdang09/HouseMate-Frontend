import { Avatar, Form, Input, Modal, Typography, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { dummy } from './Profile.dummy';
import * as St from './Profile.styled';
import { theme } from '@/themes';

const { Text } = Typography;
const { TextArea } = Input;

const validateWhitespace = (_: unknown, value: string) => {
    if (value && value.trim() === '') {
        return Promise.reject('Please enter a valid value');
    }
    return Promise.resolve();
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const Profile = () => {
    const [form] = Form.useForm();
    const [modal, contextHolder] = Modal.useModal();
    const [imageUrl, setImageUrl] = useState<string>();
    const disabledPlaceholderColor = theme.colors.disabledPlaceholder;

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        // TODO: Waiting API from server...
        setImageUrl(URL.createObjectURL(info.file.originFileObj as RcFile));

        if (info.file.status === 'done') {
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            setImageUrl(imageUrl);
        }
    };

    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn có chắc là muốn đổi thông tin cá nhân của mình?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Thay đổi',
            onOk: form.submit,
            cancelText: 'Quay lại',
        });
    };

    const handleUpdateProfile = async (values: any) => {
        console.log(values);
    };

    const handleUpdateFailed = (values: any) => {
        console.log(values);
    };

    return (
        <>
            <St.ProfileHeader>
                <ImgCrop quality={1} rotationSlider aspectSlider showReset showGrid>
                    <Upload
                        name="avatar"
                        listType="picture-circle"
                        className="avatar-uploader"
                        showUploadList={false}
                        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <Avatar src={imageUrl} size={90} />
                        ) : (
                            <Avatar icon={<UserOutlined />} size={90} />
                        )}
                    </Upload>
                </ImgCrop>

                <St.ProfileName>{dummy.fullName}</St.ProfileName>
                <St.ProfileJobPosition>{dummy.position}</St.ProfileJobPosition>
                <St.ProfilePoint>
                    <Text>Điểm tin cậy:</Text>
                    <Text>{dummy.point}</Text>
                </St.ProfilePoint>
            </St.ProfileHeader>

            <St.ProfileBody>
                <St.ProfileContentWrapper>
                    <St.ProfileContentTitle>Thành tích</St.ProfileContentTitle>
                    <St.ProfileContent>
                        {dummy.achievements.map((achievement) => {
                            return (
                                <St.ProfileRow key={achievement.id}>
                                    <St.ProfileTextKey>
                                        {achievement.serviceName}:
                                    </St.ProfileTextKey>
                                    <St.ProfileTextValue>
                                        <Text>{achievement.amount}</Text>
                                        <Text>{achievement.type}</Text>
                                    </St.ProfileTextValue>
                                </St.ProfileRow>
                            );
                        })}
                    </St.ProfileContent>
                </St.ProfileContentWrapper>

                <St.ProfileContentWrapper>
                    <St.ProfileContentTitle>Báo cáo tháng</St.ProfileContentTitle>
                    <St.ProfileContent>
                        <St.ProfileRow>
                            <St.ProfileTextKey>Tháng:</St.ProfileTextKey>
                            <St.RangePickerStyled picker="month" />
                        </St.ProfileRow>

                        {dummy.achievements.map((achievement) => {
                            return (
                                <St.ProfileRow key={achievement.id}>
                                    <St.ProfileTextKey>
                                        {achievement.serviceName}:
                                    </St.ProfileTextKey>
                                    <St.ProfileTextValue>
                                        <Text>{achievement.amount}</Text>
                                        <Text>{achievement.type}</Text>
                                    </St.ProfileTextValue>
                                </St.ProfileRow>
                            );
                        })}
                    </St.ProfileContent>
                </St.ProfileContentWrapper>

                <St.ProfileContentWrapper>
                    <St.ProfileContentTitle>Thông tin cá nhân</St.ProfileContentTitle>
                    <St.ProfileContent>
                        <St.ProfileForm
                            form={form}
                            onFinish={handleUpdateProfile}
                            onFinishFailed={handleUpdateFailed}
                            layout="vertical"
                            requiredMark={false}
                            autoComplete="off"
                        >
                            <Form.Item
                                initialValue={dummy.fullName}
                                name="fullName"
                                label="Họ Và Tên"
                                rules={[
                                    {
                                        required: true,
                                        min: 2,
                                        max: 50,
                                        message: 'Must be 2 to 50 characters.',
                                    },
                                    {
                                        validator: validateWhitespace,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                initialValue={dummy.phone}
                                name="phone"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                                        message: 'Please enter a valid phone number.',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                initialValue={dummy.email}
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        type: 'email',
                                        message: 'Please enter a valid email address.',
                                    },
                                    {
                                        max: 50,
                                        message: 'Please enter at most 50 characters.',
                                    },
                                ]}
                            >
                                <Input
                                    readOnly={dummy.email.length > 0}
                                    style={{
                                        color:
                                            dummy.email.length > 0
                                                ? disabledPlaceholderColor
                                                : 'unset',
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                initialValue={dummy.address}
                                name="address"
                                label="Địa Chỉ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your address.',
                                    },
                                    {
                                        validator: validateWhitespace,
                                    },
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                        </St.ProfileForm>
                    </St.ProfileContent>
                </St.ProfileContentWrapper>

                <St.ProfileButton type="primary" htmlType="submit" onClick={confirm}>
                    Thay đổi
                </St.ProfileButton>
            </St.ProfileBody>

            {contextHolder}
        </>
    );
};

export default Profile;
