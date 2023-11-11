import * as St from './StaffDetail.styled';

import { Avatar, Button, Col, DatePicker, Empty, Flex, Form, Modal, Row, Typography } from 'antd';
import { useRef, useState } from 'react';

import Calendar from '@/components/Calendar';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { UserType } from '@/hooks/useAuth';
import { fields } from './StaffDetail.fileds';
import locale from 'antd/es/date-picker/locale/vi_VN';
import moment from 'moment';

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;

interface Report {
    serviceId: number;
    serviceName: string;
    quantity: number;
    unitOfMeasure: string;
}

interface Detail {
    achievement: Report[];
    monthlyReport: Report[];
    userInfo: UserType;
}

const StaffDetail = () => {
    const [detail, setDetail] = useState<Detail>();

    const [form] = Form.useForm();
    const [modal, contextHolder] = Modal.useModal();
    const fieldComponents = useRef<JSX.Element[]>([]);

    console.log(detail?.achievement.length === 0);

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

    const handleUpdateStaff = async (values: any) => {
        console.log(values);
    };

    const handleUpdateFailed = (values: any) => {
        console.log(values);
    };

    return (
        <>
            <St.StaffWrapper>
                <Row gutter={40}>
                    <Col span={12}>
                        <St.StaffContent vertical align="center">
                            <Avatar src={detail?.userInfo?.avatar} size={125} />
                            <Title level={1}>{detail?.userInfo?.fullName}</Title>
                            <Text>
                                Ngày tham gia:{' '}
                                {detail?.userInfo?.createdAt
                                    ? moment(detail?.userInfo?.createdAt).format('DD/MM/yyyy')
                                    : ''}
                            </Text>

                            <St.StaffInfoItem vertical gap={10}>
                                <Title level={3}>Thành tích</Title>

                                <St.StaffInfoBox vertical gap={6}>
                                    {!detail?.achievement || detail?.achievement?.length === 0 ? (
                                        <Empty />
                                    ) : (
                                        detail?.achievement.map((item) => (
                                            <Flex justify="space-between" key={item.serviceId}>
                                                <Text>{item.serviceName}:</Text>

                                                <Paragraph>
                                                    <Text>{item.quantity}</Text>
                                                    <Text>{item.unitOfMeasure}</Text>
                                                </Paragraph>
                                            </Flex>
                                        ))
                                    )}
                                </St.StaffInfoBox>
                            </St.StaffInfoItem>

                            <St.StaffInfoItem vertical gap={10}>
                                <Title level={3}>Báo cáo tháng</Title>

                                <St.StaffInfoBox vertical gap={6}>
                                    <Flex align="center" justify="space-between">
                                        <Text>Tháng:</Text>
                                        <RangePicker size="large" picker="month" locale={locale} />
                                    </Flex>

                                    {!detail?.achievement || detail?.achievement?.length === 0 ? (
                                        <Empty />
                                    ) : (
                                        detail?.achievement.map((item) => (
                                            <Flex justify="space-between" key={item.serviceId}>
                                                <Text>{item.serviceName}:</Text>

                                                <Paragraph>
                                                    <Text>{item.quantity}</Text>
                                                    <Text>{item.unitOfMeasure}</Text>
                                                </Paragraph>
                                            </Flex>
                                        ))
                                    )}
                                </St.StaffInfoBox>
                            </St.StaffInfoItem>
                        </St.StaffContent>
                    </Col>

                    <Col span={12}>
                        <Flex vertical gap={18}>
                            <Title level={2}>Thông tin cá nhân</Title>

                            <Form
                                form={form}
                                onFinish={handleUpdateStaff}
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
                                            {fieldComponents.current.map((component) => component)}
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
            </St.StaffWrapper>

            <St.StaffWrapper>
                <Calendar />
            </St.StaffWrapper>
            {contextHolder}
        </>
    );
};

export default StaffDetail;
