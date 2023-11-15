import {
    Avatar,
    Button,
    Col,
    DatePicker,
    Flex,
    Form,
    Image,
    List,
    Modal,
    Row,
    Skeleton,
    Spin,
    Typography,
    UploadFile,
    notification,
} from 'antd';
import { TimeRangePickerProps } from 'antd/lib';
import locale from 'antd/es/date-picker/locale/vi_VN';
import {
    ExclamationCircleOutlined,
    Loading3QuartersOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Upload, { RcFile } from 'antd/es/upload';
import { UploadChangeParam } from 'antd/lib/upload';
import ImgCrop from 'antd-img-crop';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import calendar from 'dayjs/plugin/calendar';

import fallbackImage from '@/assets/images/fallback-img.png';
import { getCustomerDetail, updateAccountInfo, uploadAvatar } from '@/utils/accountAPI';
import { CategoryLabel, Role } from '@/utils/enums';
import { weekDayFormat } from '@/utils/weekDayFormat';
import InfiniteScroll from '@/components/InfiniteScroll';
import { theme } from '@/themes';
import { useAuth, useDocumentTitle } from '@/hooks';
import {
    CustomerDetailType,
    OrderItemType,
    UsageHistoryType,
} from '@/pages/Admin/CustomerDetail/CustomerDetail.type';
import Container from '@/components/Container';
import * as St from '@/pages/Admin/CustomerDetail/CustomerDetail.styled';

import { fields } from './Profile.fields';
import { ProfileContainer, ProfileWrapper } from './Profile.styled';

dayjs.locale('vi');
dayjs.extend(calendar);

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;

const Profile = () => {
    useDocumentTitle('Thông Tin Cá Nhân | HouseMate');

    const { user } = useAuth();

    // Show toast
    const [api, contextHolderNotification] = notification.useNotification({
        top: 100,
    });
    const [modal, contextHolderModal] = Modal.useModal();
    const [form] = Form.useForm();
    const fieldComponents = useRef<JSX.Element[]>([]);
    const [customer, setCustomer] = useState<CustomerDetailType>();
    const file = useRef<UploadFile>();
    const [imageUrl, setImageUrl] = useState<string>();
    const [purchaseHistory, setPurchaseHistory] = useState<OrderItemType[]>([]);
    const purchaseHistoryCurrentPage = useRef<number>(0);
    const [usageHistory, setUsageHistory] = useState<UsageHistoryType[]>([]);
    const usageHistoryCurrentPage = useRef<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);
    const [date, setDate] = useState({
        start: '1990/01',
        end: '3000/12',
    });

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                if (!user) return;

                const { data } = await getCustomerDetail(
                    Number(user?.userId),
                    date.start,
                    date.end,
                );

                form.setFieldsValue({
                    fullName: data.userInfo.fullName,
                    dateOfBirth: data.userInfo.dateOfBirth && dayjs(data.userInfo.dateOfBirth),
                    gender: data.userInfo.gender,
                    phoneNumber: data.userInfo.phoneNumber,
                    role: data.userInfo.role,
                    emailAddress: data.userInfo.emailAddress,
                    address: data.userInfo.address,
                    identityCard: data.userInfo.identityCard,
                });

                setPurchaseHistory(data.purchaseHistory.slice(0, 9));
                setUsageHistory(data.usageHistory.slice(0, 9));
                setCustomer(data);
                setImageUrl(data.userInfo.avatar);
            } catch (error: any) {
                api.error({
                    message: 'Lỗi',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [reload, user]);

    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn có muốn thay đổi chức vụ?',
            content: 'Chức vụ của tài khoản này sẽ được thay đổi.',
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

    const handleUploadAvatar = async (info: UploadChangeParam<UploadFile<any>>) => {
        setImageUrl(URL.createObjectURL(info.file as RcFile));

        try {
            if (!customer?.userInfo.userId) return;

            setLoading(true);

            await uploadAvatar(customer.userInfo.userId, file.current as RcFile);

            api.success({
                message: 'Thành công',
                description: 'Bạn đã cập nhật ảnh đại diện thành công',
            });

            setReload(!reload);
        } catch (error: any) {
            api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
            });
        } finally {
            setLoading(false);
        }
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

    const handleUpdateCustomer = async (values: any) => {
        try {
            setLoading(true);

            if (!user?.userId) return;

            await updateAccountInfo(user.userId, {
                fullName: values.fullName,
                dateOfBirth: dayjs(values.dateOfBirth).add(7, 'hours'),
                gender: values.gender,
                phoneNumber: values.phoneNumber,
                role: Role.CUSTOMER,
                identityCard: values.identityCard,
                email: user.emailAddress,
                address: values.address,
            });

            api.success({
                message: 'Thành công',
                description: 'Bạn đã cập nhật thông tin thành công',
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

    const handleUpdateFailed = (values: any) => {
        console.log(values);
    };

    const purchaseHistoryHasMore = () => {
        setLoading(true);

        setTimeout(() => {
            setPurchaseHistory((prev) => {
                const newPurchaseHistory =
                    customer?.purchaseHistory.splice(++purchaseHistoryCurrentPage.current, 9) || [];

                return [...prev, ...newPurchaseHistory];
            });
            setLoading(false);
        }, 500);
    };

    const usageHistoryHasMore = () => {
        setLoading(true);

        setTimeout(() => {
            setUsageHistory((prev) => {
                const newUsageHistory =
                    customer?.usageHistory.splice(++usageHistoryCurrentPage.current, 9) || [];

                return [...prev, ...newUsageHistory];
            });
            setLoading(false);
        }, 500);
    };

    return (
        <>
            {contextHolderNotification}

            <ProfileContainer>
                <Container>
                    <Spin spinning={loading} tip="Đang tải...">
                        <Flex vertical gap={44}>
                            <ProfileWrapper>
                                <Row gutter={40}>
                                    <Col span={12}>
                                        <St.CustomerContent vertical align="center">
                                            <ImgCrop
                                                quality={1}
                                                rotationSlider
                                                aspectSlider
                                                showReset
                                                showGrid
                                            >
                                                <Upload
                                                    name="avatar"
                                                    listType="picture-circle"
                                                    showUploadList={false}
                                                    beforeUpload={beforeUpload}
                                                    onChange={handleUploadAvatar}
                                                >
                                                    {imageUrl ? (
                                                        <Avatar
                                                            src={customer?.userInfo.avatar}
                                                            size={125}
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            icon={<UserOutlined />}
                                                            size={125}
                                                        />
                                                    )}
                                                </Upload>
                                            </ImgCrop>

                                            <Title level={1}>{customer?.userInfo.fullName}</Title>
                                            <Text>
                                                {`Ngày tham gia: ${dayjs(
                                                    customer?.userInfo.createdAt,
                                                ).format('DD/MM/YYYY')}`}
                                            </Text>

                                            <St.CustomerInfoItem vertical gap={10}>
                                                <Title level={3}>Giao dịch</Title>

                                                <St.CustomerInfoBox vertical gap={6}>
                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Số đơn hàng:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                    {customer?.numberOfOrder || 0}
                                                                </Text>
                                                                <Text>đơn</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>

                                                    <Skeleton loading={loading} paragraph={false}>
                                                        <Flex justify="space-between">
                                                            <Text>Tổng tiền đã tiêu:</Text>

                                                            <Paragraph>
                                                                <Text>
                                                                    {customer?.amountSpent.toLocaleString() ||
                                                                        0}
                                                                </Text>
                                                                <Text>đ</Text>
                                                            </Paragraph>
                                                        </Flex>
                                                    </Skeleton>
                                                </St.CustomerInfoBox>
                                            </St.CustomerInfoItem>

                                            <St.CustomerInfoItem vertical gap={10}>
                                                <Title level={3}>Báo cáo sử dụng hàng tháng</Title>

                                                <St.CustomerInfoBox vertical gap={6}>
                                                    <Flex align="center" justify="space-between">
                                                        <Text>Tháng:</Text>
                                                        <RangePicker
                                                            size="large"
                                                            picker="month"
                                                            locale={locale}
                                                            onChange={onChangeDate}
                                                            format={'YYYY/MM'}
                                                        />
                                                    </Flex>

                                                    <List
                                                        dataSource={customer?.monthlyReport}
                                                        renderItem={(item) => (
                                                            <List.Item>
                                                                <Text>{item.serviceName}</Text>

                                                                <Paragraph>
                                                                    <Text>{item.quantity}</Text>
                                                                    <Text>
                                                                        {item.unitOfMeasure}
                                                                    </Text>
                                                                </Paragraph>
                                                            </List.Item>
                                                        )}
                                                    />
                                                </St.CustomerInfoBox>
                                            </St.CustomerInfoItem>
                                        </St.CustomerContent>
                                    </Col>

                                    <Col span={12}>
                                        <Flex vertical gap={18}>
                                            <Title level={2}>Thông tin cá nhân</Title>

                                            <Form
                                                form={form}
                                                onFinish={handleUpdateCustomer}
                                                onFinishFailed={handleUpdateFailed}
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
                                                                field.halfWidth
                                                                    ? { width: '50%' }
                                                                    : { width: '100%' }
                                                            }
                                                        >
                                                            {field.component}
                                                        </Form.Item>
                                                    );

                                                    if (field.halfWidth) {
                                                        fieldComponents.current.push(component);

                                                        if (fieldComponents.current.length !== 2)
                                                            return;
                                                    }

                                                    return fieldComponents.current.length === 2 ? (
                                                        <Flex gap={12} key={field.key}>
                                                            {fieldComponents.current.map(
                                                                (component) => component,
                                                            )}
                                                        </Flex>
                                                    ) : (
                                                        component
                                                    );
                                                })}

                                                <Flex justify="flex-end">
                                                    <Button type="primary" onClick={confirm}>
                                                        Chỉnh sửa
                                                    </Button>
                                                </Flex>
                                            </Form>
                                        </Flex>
                                    </Col>
                                </Row>
                            </ProfileWrapper>

                            <Flex vertical>
                                <Row gutter={44}>
                                    <Col span={12}>
                                        <ProfileWrapper>
                                            <Title level={2}>Lịch sử mua hàng</Title>

                                            <St.CustomerList>
                                                <InfiniteScroll
                                                    fetchMore={purchaseHistoryHasMore}
                                                    hasMore={
                                                        purchaseHistory.length <
                                                        Number(customer?.purchaseHistory.length)
                                                    }
                                                    loader={
                                                        <Flex
                                                            justify="center"
                                                            style={{ marginTop: '20px' }}
                                                        >
                                                            <Loading3QuartersOutlined
                                                                spin
                                                                style={{
                                                                    color: theme.colors.primary,
                                                                }}
                                                            />
                                                        </Flex>
                                                    }
                                                >
                                                    <List
                                                        dataSource={purchaseHistory}
                                                        renderItem={(item) => (
                                                            <List.Item>
                                                                <St.CustomerItem>
                                                                    <Flex gap={20}>
                                                                        <Image
                                                                            width={120}
                                                                            height={120}
                                                                            src={
                                                                                item.service
                                                                                    .images &&
                                                                                item.service
                                                                                    .images[0]
                                                                                    .imageUrl
                                                                            }
                                                                            fallback={fallbackImage}
                                                                        />

                                                                        <Flex vertical>
                                                                            <St.CustomerItemHeading
                                                                                justify="space-between"
                                                                                align="flex-start"
                                                                                gap={12}
                                                                            >
                                                                                <Title level={3}>
                                                                                    {
                                                                                        item.service
                                                                                            .titleName
                                                                                    }
                                                                                </Title>
                                                                            </St.CustomerItemHeading>

                                                                            <St.CustomerItemContent
                                                                                vertical
                                                                            >
                                                                                <Paragraph>
                                                                                    <Text>
                                                                                        {`Phân loại: `}
                                                                                    </Text>
                                                                                    <Text>
                                                                                        {item
                                                                                            .service
                                                                                            .package
                                                                                            ? CategoryLabel.PACKAGE
                                                                                            : CategoryLabel.SINGLE}
                                                                                    </Text>
                                                                                </Paragraph>

                                                                                <Paragraph>
                                                                                    <Text>
                                                                                        {`Số lượng: `}
                                                                                    </Text>
                                                                                    <Text>
                                                                                        {
                                                                                            item.quantity
                                                                                        }
                                                                                    </Text>
                                                                                </Paragraph>

                                                                                <Paragraph>
                                                                                    <Text>
                                                                                        {`Ngày: `}
                                                                                    </Text>
                                                                                    <Text>
                                                                                        {`${dayjs(
                                                                                            item.startDate,
                                                                                        ).calendar(
                                                                                            null,
                                                                                            {
                                                                                                lastDay:
                                                                                                    '[Hôm qua] lúc H:mm, DD/MM/YYYY',
                                                                                                sameDay:
                                                                                                    '[Hôm nay] lúc H:mm, DD/MM/YYYY',
                                                                                                nextDay:
                                                                                                    '[Ngày mai] lúc H:mm, DD/MM/YYYY',
                                                                                                lastWeek: `[${weekDayFormat(
                                                                                                    dayjs(
                                                                                                        item.startDate,
                                                                                                    ).format(
                                                                                                        'd',
                                                                                                    ),
                                                                                                )}]  [tuần trước] lúc H:mm, DD/MM/YYYY`,
                                                                                                nextWeek: `[${weekDayFormat(
                                                                                                    dayjs(
                                                                                                        item.startDate,
                                                                                                    ).format(
                                                                                                        'd',
                                                                                                    ),
                                                                                                )}]  [tuần tới] lúc H:mm, DD/MM/YYYY`,
                                                                                            },
                                                                                        )}`}
                                                                                    </Text>
                                                                                </Paragraph>

                                                                                <Paragraph>
                                                                                    <Text>
                                                                                        {`Giá tiền: `}
                                                                                    </Text>
                                                                                    <Text>
                                                                                        {`${(
                                                                                            item.quantity *
                                                                                            item
                                                                                                .service
                                                                                                .finalPrice
                                                                                        ).toLocaleString()}đ`}
                                                                                    </Text>
                                                                                </Paragraph>
                                                                            </St.CustomerItemContent>
                                                                        </Flex>
                                                                    </Flex>
                                                                </St.CustomerItem>
                                                            </List.Item>
                                                        )}
                                                    />
                                                </InfiniteScroll>
                                            </St.CustomerList>
                                        </ProfileWrapper>
                                    </Col>

                                    <Col span={12}>
                                        <ProfileWrapper>
                                            <Title level={2}>Lịch sử sử dụng dịch vụ </Title>

                                            <St.CustomerList>
                                                <InfiniteScroll
                                                    fetchMore={usageHistoryHasMore}
                                                    hasMore={
                                                        usageHistory.length <
                                                        Number(customer?.usageHistory.length)
                                                    }
                                                    loader={
                                                        <Flex
                                                            justify="center"
                                                            style={{ marginTop: '20px' }}
                                                        >
                                                            <Loading3QuartersOutlined
                                                                spin
                                                                style={{
                                                                    color: theme.colors.primary,
                                                                }}
                                                            />
                                                        </Flex>
                                                    }
                                                >
                                                    <List
                                                        dataSource={customer?.usageHistory}
                                                        renderItem={(item) => (
                                                            <List.Item>
                                                                <St.CustomerItem>
                                                                    <Flex gap={20}>
                                                                        <Image
                                                                            width={120}
                                                                            height={120}
                                                                            src={
                                                                                item.service
                                                                                    .images &&
                                                                                item.service
                                                                                    .images[0]
                                                                                    .imageUrl
                                                                            }
                                                                            fallback={fallbackImage}
                                                                        />

                                                                        <Flex vertical>
                                                                            <St.CustomerItemHeading
                                                                                justify="space-between"
                                                                                align="flex-start"
                                                                                gap={12}
                                                                            >
                                                                                <Title level={3}>
                                                                                    {
                                                                                        item.service
                                                                                            .titleName
                                                                                    }
                                                                                </Title>
                                                                            </St.CustomerItemHeading>

                                                                            <St.CustomerItemContent
                                                                                vertical
                                                                            >
                                                                                <Paragraph>
                                                                                    <Text>
                                                                                        {`Phân loại: `}
                                                                                    </Text>
                                                                                    <Text>
                                                                                        {item
                                                                                            .service
                                                                                            .package
                                                                                            ? CategoryLabel.PACKAGE
                                                                                            : CategoryLabel.SINGLE}
                                                                                    </Text>
                                                                                </Paragraph>

                                                                                <Paragraph>
                                                                                    <Text>
                                                                                        {`Dịch vụ: `}
                                                                                    </Text>
                                                                                    <Text>
                                                                                        {
                                                                                            item
                                                                                                .service
                                                                                                .titleName
                                                                                        }
                                                                                    </Text>
                                                                                </Paragraph>

                                                                                <Paragraph>
                                                                                    <Text>
                                                                                        {`Ngày: `}
                                                                                    </Text>
                                                                                    <Text>
                                                                                        {`${dayjs(
                                                                                            item.startDate,
                                                                                        ).calendar(
                                                                                            null,
                                                                                            {
                                                                                                lastDay:
                                                                                                    '[Hôm qua] lúc H:mm, DD/MM/YYYY',
                                                                                                sameDay:
                                                                                                    '[Hôm nay] lúc H:mm, DD/MM/YYYY',
                                                                                                nextDay:
                                                                                                    '[Ngày mai] lúc H:mm, DD/MM/YYYY',
                                                                                                lastWeek: `[${weekDayFormat(
                                                                                                    dayjs(
                                                                                                        item.startDate,
                                                                                                    ).format(
                                                                                                        'd',
                                                                                                    ),
                                                                                                )}]  [tuần trước] lúc H:mm, DD/MM/YYYY`,
                                                                                                nextWeek: `[${weekDayFormat(
                                                                                                    dayjs(
                                                                                                        item.startDate,
                                                                                                    ).format(
                                                                                                        'd',
                                                                                                    ),
                                                                                                )}]  [tuần tới] lúc H:mm, DD/MM/YYYY`,
                                                                                            },
                                                                                        )}`}
                                                                                    </Text>
                                                                                </Paragraph>

                                                                                <Paragraph>
                                                                                    <Text>
                                                                                        {`Nhân viên: `}
                                                                                    </Text>
                                                                                    <Text>
                                                                                        {
                                                                                            item
                                                                                                .staff
                                                                                                .fullName
                                                                                        }
                                                                                    </Text>
                                                                                </Paragraph>
                                                                            </St.CustomerItemContent>
                                                                        </Flex>
                                                                    </Flex>
                                                                </St.CustomerItem>
                                                            </List.Item>
                                                        )}
                                                    />
                                                </InfiniteScroll>
                                            </St.CustomerList>
                                        </ProfileWrapper>
                                    </Col>
                                </Row>
                            </Flex>
                        </Flex>
                    </Spin>
                </Container>
            </ProfileContainer>

            {contextHolderModal}
        </>
    );
};

export default Profile;
