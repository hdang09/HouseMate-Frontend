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
    notification,
} from 'antd';
import { TimeRangePickerProps } from 'antd/lib';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import calendar from 'dayjs/plugin/calendar';

import fallbackImage from '@/assets/images/fallback-img.png';
import { getCustomerDetail, updateRole } from '@/utils/accountAPI';
import { CategoryLabel } from '@/utils/enums';
import { weekDayFormat } from '@/utils/weekDayFormat';

import * as St from './CustomerDetail.styled';
import { fields } from './CustomerDetail.fields';
import { CustomerDetailType } from './CustomerDetail.type';

dayjs.locale('vi');
dayjs.extend(calendar);

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;

const CustomerDetail = () => {
    const { id } = useParams();

    // Show toast
    const [api, contextHolderNotification] = notification.useNotification({
        top: 100,
    });
    const [modal, contextHolderModal] = Modal.useModal();
    const [form] = Form.useForm();
    const fieldComponents = useRef<JSX.Element[]>([]);
    const [customer, setCustomer] = useState<CustomerDetailType>();
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

                if (!id) return;

                const { data } = await getCustomerDetail(Number(id), date.start, date.end);

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

                setCustomer(data);
            } catch (error: any) {
                api.error({
                    message: 'Lỗi',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [reload]);

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

            if (!id) return;

            await updateRole(Number(id), values.role);

            api.success({
                message: 'Thành công',
                description: 'Chức vụ đã được thay đổi.',
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

    return (
        <>
            {contextHolderNotification}

            <Spin spinning={loading} tip="Đang tải...">
                <Flex vertical gap={44}>
                    <St.CustomerWrapper>
                        <Row gutter={40}>
                            <Col span={12}>
                                <St.CustomerContent vertical align="center">
                                    <Avatar src={customer?.userInfo.avatar} size={125} />
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
                                                        <Text>{customer?.numberOfOrder}</Text>
                                                        <Text>đơn</Text>
                                                    </Paragraph>
                                                </Flex>
                                            </Skeleton>

                                            <Skeleton loading={loading} paragraph={false}>
                                                <Flex justify="space-between">
                                                    <Text>Tổng tiền đã tiêu:</Text>

                                                    <Paragraph>
                                                        <Text>
                                                            {customer?.amountSpent.toLocaleString()}
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
                                                            <Text>{item.unitOfMeasure}</Text>
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
                                                    required={false}
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

                                                if (fieldComponents.current.length !== 2) return;
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
                                                Đổi Chức Vụ
                                            </Button>
                                        </Flex>
                                    </Form>
                                </Flex>
                            </Col>
                        </Row>
                    </St.CustomerWrapper>

                    <Flex vertical>
                        <Row gutter={44}>
                            <Col span={12}>
                                <St.CustomerWrapper>
                                    <Title level={2}>Lịch sử mua hàng</Title>

                                    <St.CustomerList>
                                        <List
                                            dataSource={customer?.purchaseHistory}
                                            renderItem={(item) => (
                                                <List.Item>
                                                    <St.CustomerItem>
                                                        <Flex gap={20}>
                                                            <Image
                                                                width={120}
                                                                height={120}
                                                                src={
                                                                    item.service.images &&
                                                                    item.service.images[0].imageUrl
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
                                                                        {item.service.titleName}
                                                                    </Title>
                                                                </St.CustomerItemHeading>

                                                                <St.CustomerItemContent vertical>
                                                                    <Paragraph>
                                                                        <Text>Phân loại: </Text>
                                                                        <Text>
                                                                            {item.service.package
                                                                                ? CategoryLabel.PACKAGE
                                                                                : CategoryLabel.SINGLE}
                                                                        </Text>
                                                                    </Paragraph>

                                                                    <Paragraph>
                                                                        <Text>Dịch vụ: </Text>
                                                                        <Text>
                                                                            {item.service.titleName}
                                                                        </Text>
                                                                    </Paragraph>

                                                                    <Paragraph>
                                                                        <Text>Ngày: </Text>
                                                                        <Text>
                                                                            {`${dayjs(
                                                                                item.startDate,
                                                                            ).calendar(null, {
                                                                                lastDay:
                                                                                    '[Hôm qua] lúc H:mm, DD/MM/YYYY',
                                                                                sameDay:
                                                                                    '[Hôm nay] lúc H:mm, DD/MM/YYYY',
                                                                                nextDay:
                                                                                    '[Ngày mai] lúc H:mm, DD/MM/YYYY',
                                                                                lastWeek: `[${weekDayFormat(
                                                                                    dayjs(
                                                                                        item.startDate,
                                                                                    ).format('d'),
                                                                                )}]  [tuần trước] lúc H:mm, DD/MM/YYYY`,
                                                                                nextWeek: `[${weekDayFormat(
                                                                                    dayjs(
                                                                                        item.startDate,
                                                                                    ).format('d'),
                                                                                )}]  [tuần tới] lúc H:mm, DD/MM/YYYY`,
                                                                            })}`}
                                                                        </Text>
                                                                    </Paragraph>

                                                                    <Paragraph>
                                                                        <Text>Giá tiền: </Text>
                                                                        <Text></Text>
                                                                    </Paragraph>
                                                                </St.CustomerItemContent>
                                                            </Flex>
                                                        </Flex>
                                                    </St.CustomerItem>
                                                </List.Item>
                                            )}
                                        />
                                    </St.CustomerList>
                                </St.CustomerWrapper>
                            </Col>

                            <Col span={12}>
                                <St.CustomerWrapper>
                                    <Title level={2}>Lịch sử sử dụng dịch vụ </Title>

                                    <St.CustomerList>
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
                                                                    item.service.images &&
                                                                    item.service.images[0].imageUrl
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
                                                                        {item.service.titleName}
                                                                    </Title>
                                                                </St.CustomerItemHeading>

                                                                <St.CustomerItemContent vertical>
                                                                    <Paragraph>
                                                                        <Text>Phân loại: </Text>
                                                                        <Text>
                                                                            {item.service.package
                                                                                ? CategoryLabel.PACKAGE
                                                                                : CategoryLabel.SINGLE}
                                                                        </Text>
                                                                    </Paragraph>

                                                                    <Paragraph>
                                                                        <Text>Dịch vụ: </Text>
                                                                        <Text>
                                                                            {item.service.titleName}
                                                                        </Text>
                                                                    </Paragraph>

                                                                    <Paragraph>
                                                                        <Text>Ngày: </Text>
                                                                        <Text>
                                                                            {`${dayjs(
                                                                                item.startDate,
                                                                            ).calendar(null, {
                                                                                lastDay:
                                                                                    '[Hôm qua] lúc H:mm, DD/MM/YYYY',
                                                                                sameDay:
                                                                                    '[Hôm nay] lúc H:mm, DD/MM/YYYY',
                                                                                nextDay:
                                                                                    '[Ngày mai] lúc H:mm, DD/MM/YYYY',
                                                                                lastWeek: `[${weekDayFormat(
                                                                                    dayjs(
                                                                                        item.startDate,
                                                                                    ).format('d'),
                                                                                )}]  [tuần trước] lúc H:mm, DD/MM/YYYY`,
                                                                                nextWeek: `[${weekDayFormat(
                                                                                    dayjs(
                                                                                        item.startDate,
                                                                                    ).format('d'),
                                                                                )}]  [tuần tới] lúc H:mm, DD/MM/YYYY`,
                                                                            })}`}
                                                                        </Text>
                                                                    </Paragraph>

                                                                    <Paragraph>
                                                                        <Text>Nhân viên: </Text>
                                                                        <Text>
                                                                            {item.staff.fullName}
                                                                        </Text>
                                                                    </Paragraph>
                                                                </St.CustomerItemContent>
                                                            </Flex>
                                                        </Flex>
                                                    </St.CustomerItem>
                                                </List.Item>
                                            )}
                                        />
                                    </St.CustomerList>
                                </St.CustomerWrapper>
                            </Col>
                        </Row>
                    </Flex>
                </Flex>
            </Spin>

            {contextHolderModal}
        </>
    );
};

export default CustomerDetail;
