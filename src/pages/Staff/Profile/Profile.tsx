import { Avatar, Flex, Form, List, Modal, Spin, Typography, Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { TimeRangePickerProps } from 'antd/lib';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

import { useAuth, useDocumentTitle } from '@/hooks';
import { Role, RoleLabel } from '@/utils/enums';
import { getStaffDetail, updateAccountInfo, uploadAvatar } from '@/utils/accountAPI';

import { DateRange, StaffProfile } from './Profile.type';
import { fields } from './Profile.fields';
import * as St from './Profile.styled';

const { Text } = Typography;

const Profile = () => {
    useDocumentTitle('Thông Tin Cá Nhân | HouseMate');

    const { user } = useAuth();
    const [form] = Form.useForm();

    // Show message
    const [modal, contextHolderModal] = Modal.useModal();
    const [messageApi, contextHolderMessage] = message.useMessage();

    const [staff, setStaff] = useState<StaffProfile>();
    const [date, setDate] = useState<DateRange>({
        start: '1900/01',
        end: '3000/12',
    });
    const file = useRef<UploadFile>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [reload, setReload] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                if (!user?.userId) return;

                setLoading(true);

                const { data }: { data: StaffProfile } = await getStaffDetail(
                    Number(user.userId),
                    date.start,
                    date.end,
                );

                form.setFieldsValue({
                    fullName: data.userInfo.fullName,
                    dateOfBirth: dayjs(data.userInfo.dateOfBirth),
                    gender: data.userInfo.gender,
                    phoneNumber: data.userInfo.phoneNumber,
                    email: data.userInfo.emailAddress,
                    address: data.userInfo.address,
                });

                setStaff(data);
                setImageUrl(data.userInfo.avatar);
            } catch (error: any) {
                messageApi.open({
                    type: 'error',
                    content: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [reload, user]);

    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn có chắc chắn muốn thay đổi thông tin cá nhân?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Quay lại',
            onCancel: form.submit,
            cancelText: 'Thay đổi',
        });
    };

    const onChangeDate: TimeRangePickerProps['onChange'] = (_, dateString: [string, string]) => {
        if (!dateString[0] || !dateString[1])
            return (
                setDate({
                    start: '1990/01',
                    end: '3000/12',
                }),
                setReload(!reload)
            );

        setDate({
            start: dateString[0],
            end: dateString[1],
        });
        setReload(!reload);
    };

    const beforeUpload = (f: RcFile) => {
        file.current = f;
        return false;
    };

    const handleUploadAvatar = async (info: UploadChangeParam<UploadFile<any>>) => {
        setImageUrl(URL.createObjectURL(info.file as RcFile));

        try {
            if (!staff?.userInfo.userId) return;

            setLoading(true);

            await uploadAvatar(staff.userInfo.userId, file.current as RcFile);

            messageApi.open({
                type: 'success',
                content: 'Bạn đã cập nhật ảnh đại diện thành công',
            });

            setReload(!reload);
        } catch (error: any) {
            messageApi.open({
                type: 'error',
                content: error.response ? error.response.data : error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (values: any) => {
        try {
            if (!user?.userId) return;

            setLoading(true);

            await updateAccountInfo(Number(user.userId), {
                fullName: values.fullName,
                dateOfBirth: dayjs(values.dateOfBirth).add(7, 'hours'),
                gender: values.gender,
                phoneNumber: values.phoneNumber,
                role: Role.STAFF,
                identityCard: user.identityCard || '',
                email: user.emailAddress,
                address: values.address,
            });

            messageApi.open({
                type: 'success',
                content: 'Bạn đã cập nhật thông tin thành công',
            });

            setReload(!reload);
        } catch (error: any) {
            messageApi.open({
                type: 'error',
                content: error.response ? error.response.data : error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateFailed = (values: any) => {
        console.log(values);
    };

    return (
        <>
            {contextHolderMessage}

            <Spin spinning={loading} tip="Đang tải...">
                <St.ProfileHeader>
                    <ImgCrop quality={1} rotationSlider aspectSlider showReset showGrid>
                        <Upload
                            name="avatar"
                            listType="picture-circle"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleUploadAvatar}
                        >
                            {imageUrl ? (
                                <Avatar src={staff?.userInfo.avatar} size={90} />
                            ) : (
                                <Avatar icon={<UserOutlined />} size={90} />
                            )}
                        </Upload>
                    </ImgCrop>

                    <St.ProfileName>{staff?.userInfo.fullName}</St.ProfileName>
                    <St.ProfileJobPosition>
                        {staff?.userInfo.role === Role.STAFF ? RoleLabel.STAFF : RoleLabel.UNKNOWN}
                    </St.ProfileJobPosition>
                    <St.ProfilePoint>
                        <Text>Điểm tin cậy:</Text>
                        <Text>{staff?.userInfo.proficiencyScore || 0}</Text>
                    </St.ProfilePoint>
                </St.ProfileHeader>

                <St.ProfileBody>
                    <St.ProfileContentWrapper>
                        <St.ProfileContentTitle>Báo cáo tháng</St.ProfileContentTitle>
                        <St.ProfileContent>
                            <Flex gap={12} justify="space-between" align="center">
                                <St.ProfileTextKey style={{ flexShrink: 0 }}>
                                    Tháng:
                                </St.ProfileTextKey>
                                <St.RangePickerStyled
                                    picker="month"
                                    size="large"
                                    format={'YYYY/MM'}
                                    onChange={onChangeDate}
                                />
                            </Flex>

                            <List
                                dataSource={staff?.monthlyReport}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Flex
                                            key={item.serviceId}
                                            justify="space-between"
                                            align="center"
                                            wrap="wrap"
                                            gap={6}
                                            style={{ width: '100%' }}
                                        >
                                            <St.ProfileTextKey>
                                                {item.serviceName}:
                                            </St.ProfileTextKey>
                                            <St.ProfileTextValue>
                                                <Text>{item.quantity}</Text>
                                                <Text>{item.unitOfMeasure}</Text>
                                            </St.ProfileTextValue>
                                        </Flex>
                                    </List.Item>
                                )}
                            />
                        </St.ProfileContent>
                    </St.ProfileContentWrapper>

                    <St.ProfileContentWrapper>
                        <St.ProfileContentTitle>Thành tích</St.ProfileContentTitle>
                        <St.ProfileContent>
                            <List
                                dataSource={staff?.achievement}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Flex
                                            key={item.serviceId}
                                            justify="space-between"
                                            align="center"
                                            wrap="wrap"
                                            gap={6}
                                            style={{ width: '100%' }}
                                        >
                                            <St.ProfileTextKey>
                                                {item.serviceName}:
                                            </St.ProfileTextKey>
                                            <St.ProfileTextValue>
                                                <Text>{item.quantity}</Text>
                                                <Text>{item.unitOfMeasure}</Text>
                                            </St.ProfileTextValue>
                                        </Flex>
                                    </List.Item>
                                )}
                            />
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
                                autoComplete="off"
                            >
                                {fields.map((field) => (
                                    <Form.Item
                                        key={field.key}
                                        label={field.label}
                                        name={field.name}
                                        initialValue={field.initialValue}
                                        rules={field.rules}
                                        required
                                    >
                                        {field.component}
                                    </Form.Item>
                                ))}
                            </St.ProfileForm>
                        </St.ProfileContent>
                    </St.ProfileContentWrapper>

                    <St.ProfileButton type="primary" htmlType="submit" onClick={confirm}>
                        Thay đổi
                    </St.ProfileButton>
                </St.ProfileBody>
            </Spin>

            {contextHolderModal}
        </>
    );
};

export default Profile;
