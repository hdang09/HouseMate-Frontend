import * as St from './StaffDetail.styled';

import {
    Avatar,
    Button,
    Col,
    DatePicker,
    Empty,
    Flex,
    Form,
    Modal,
    Row,
    Typography,
    notification,
} from 'antd';
import { getStaffDetail, updateAccountInfo } from '@/utils/accountAPI';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Calendar from '@/components/Calendar';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { TimeRangePickerProps } from 'antd';
import { UserType } from '@/hooks/useAuth';
import config from '@/config';
import dayjs from 'dayjs';
import { fields } from './StaffDetail.fileds';
import locale from 'antd/es/date-picker/locale/vi_VN';

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

interface Date {
    start: string;
    end: string;
}

const StaffDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [detail, setDetail] = useState<Detail>();
    const [date, setDate] = useState<Date>({
        start: '1900/01',
        end: '3000/12',
    });

    useEffect(() => {
        (async () => {
            if (!id) return;

            const { data }: { data: Detail } = await getStaffDetail(+id, date.start, date.end);

            if (!data.userInfo) navigate(config.routes.public.notFound);

            setDetail(data);
        })();
    }, [date]);

    useEffect(() => {
        form.setFieldsValue({
            fullName: detail?.userInfo.fullName || '',
            dateOfBirth: dayjs(detail?.userInfo.dateOfBirth) || '',
            gender: detail?.userInfo.gender,
            phoneNumber: detail?.userInfo.phoneNumber || '',
            email: detail?.userInfo.emailAddress || '',
            address: detail?.userInfo.address || '',
            role: detail?.userInfo.role || '',
            identityCard: detail?.userInfo.identityCard || '',
        });
    }, [detail]);

    const [form] = Form.useForm();
    const [modal, contextHolderModal] = Modal.useModal();
    const [api, contextHolderNotification] = notification.useNotification();
    const fieldComponents = useRef<JSX.Element[]>([]);

    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn có muốn thay đổi thông tin?',
            content: 'Thông tin của tài khoản này sẽ được thay đổi.',
            icon: <ExclamationCircleOutlined />,
            okText: 'Xác nhận',
            onOk: form.submit,
            cancelText: 'Quay lại',
        });
    };

    const handleUpdateStaff = async (values: any) => {
        if (!detail?.userInfo.userId) return;

        await updateAccountInfo(+detail?.userInfo.userId, values);
        api.success({
            message: 'Thành công',
            description: 'Bạn đã cập nhật thông tin thành công.',
        });
    };

    const handleUpdateFailed = (values: any) => {
        console.log(values);
    };

    const onChangeDate: TimeRangePickerProps['onChange'] = (_, dateString) => {
        setDate({
            start: dayjs(dateString[0]).format('YYYY/MM'),
            end: dayjs(dateString[1]).format('YYYY/MM'),
        });
    };

    return (
        <>
            <Row gutter={40}>
                <Col span={12}>
                    <St.StaffContent vertical align="center">
                        <Avatar src={detail?.userInfo?.avatar} size={125} />
                        <Title level={1}>{detail?.userInfo?.fullName}</Title>
                        <Text>
                            Ngày tham gia:{' '}
                            {detail?.userInfo?.createdAt
                                ? dayjs(detail?.userInfo?.createdAt).format('DD/MM/YYYY')
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
                                <Flex
                                    align="center"
                                    justify="space-between"
                                    style={{ marginBottom: '12px' }}
                                >
                                    <Text>Tháng:</Text>
                                    <RangePicker
                                        onChange={onChangeDate}
                                        size="large"
                                        picker="month"
                                        locale={locale}
                                        format="YYYY/MM"
                                    />
                                </Flex>

                                {!detail?.monthlyReport || detail?.monthlyReport?.length === 0 ? (
                                    <Empty />
                                ) : (
                                    detail?.monthlyReport.map((item) => (
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
                    <St.StaffContent vertical gap={18}>
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

                            <Flex justify="flex-end">
                                <Button type="primary" onClick={confirm}>
                                    Chỉnh Sửa
                                </Button>
                            </Flex>
                        </Form>
                    </St.StaffContent>
                </Col>
            </Row>

            <St.StaffWrapper>
                <Calendar admin />
            </St.StaffWrapper>

            {contextHolderModal}
            {contextHolderNotification}
        </>
    );
};

export default StaffDetail;
