import { Avatar, Button, Col, DatePicker, Flex, Form, List, Modal, Row, Typography } from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';

import * as St from './CustomerDetail.styled';
import { fields } from './CustomerDetail.fields';
import { useRef } from 'react';

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;

const CustomerDetail = () => {
    const [form] = Form.useForm();
    const [modal, contextHolder] = Modal.useModal();
    const fieldComponents = useRef<JSX.Element[]>([]);

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

    const handleUpdateCustomer = async (values: any) => {
        console.log(values);
    };

    const handleUpdateFailed = (values: any) => {
        console.log(values);
    };

    return (
        <>
            <Flex vertical gap={44}>
                <St.CustomerWrapper>
                    <Row gutter={40}>
                        <Col span={12}>
                            <St.CustomerContent vertical align="center">
                                <Avatar src="" icon={<UserOutlined />} size={125} />
                                <Title level={1}>Dương Hoàng Nam</Title>
                                <Text>Ngày tham gia: 10/10/2023</Text>

                                <St.CustomerInfoItem vertical gap={10}>
                                    <Title level={3}>Giao dịch</Title>

                                    <St.CustomerInfoBox vertical gap={6}>
                                        <Flex justify="space-between">
                                            <Text>Số đơn hàng:</Text>

                                            <Paragraph>
                                                <Text>40</Text>
                                                <Text>đơn</Text>
                                            </Paragraph>
                                        </Flex>

                                        <Flex justify="space-between">
                                            <Text>Tổng tiền đã tiêu:</Text>

                                            <Paragraph>
                                                <Text>1500000</Text>
                                                <Text>đ</Text>
                                            </Paragraph>
                                        </Flex>

                                        <Flex justify="space-between">
                                            <Text>Giao dịch / tháng:</Text>

                                            <Paragraph>
                                                <Text>3</Text>
                                                <Text>lần</Text>
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

            {contextHolder}
        </>
    );
};

export default CustomerDetail;
