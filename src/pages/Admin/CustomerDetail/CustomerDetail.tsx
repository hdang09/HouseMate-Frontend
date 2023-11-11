import {
    Avatar,
    Button,
    Col,
    DatePicker,
    Flex,
    Form,
    List,
    Modal,
    Row,
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

import { getCustomerDetail } from '@/utils/accountAPI';

import * as St from './CustomerDetail.styled';
import { fields } from './CustomerDetail.fields';
import { CustomerDetailType } from './CustomerDetail.type';

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

                const { data } = await getCustomerDetail(Number(id), date.start, date.end);

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
            return setDate({
                start: '1990/01',
                end: '3000/12',
            });

        setDate({
            start: dateString[0],
            end: dateString[1],
        });
        setReload(!reload);
    };

    const handleUpdateCustomer = async (values: any) => {
        console.log(values);
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
                                            <Flex justify="space-between">
                                                <Text>Số đơn hàng:</Text>

                                                <Paragraph>
                                                    <Text>{customer?.numberOfOrder}</Text>
                                                    <Text>đơn</Text>
                                                </Paragraph>
                                            </Flex>

                                            <Flex justify="space-between">
                                                <Text>Tổng tiền đã tiêu:</Text>

                                                <Paragraph>
                                                    <Text>
                                                        {customer?.amountSpent.toLocaleString()}
                                                    </Text>
                                                    <Text>đ</Text>
                                                </Paragraph>
                                            </Flex>
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
                                                Chỉnh Sửa
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

                                    <List />
                                </St.CustomerWrapper>
                            </Col>

                            <Col span={12}>
                                <St.CustomerWrapper>
                                    <Title level={2}>Lịch sử sử dụng dịch vụ </Title>

                                    <List />
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
