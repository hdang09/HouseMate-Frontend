import { Avatar, Col, DatePicker, Flex, Row, Typography } from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { UserOutlined } from '@ant-design/icons';
import * as St from './CustomerDetail.styled';

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;

const CustomerDetail = () => {
    return (
        <St.CustomerWrapper wrap="wrap" gap={44}>
            <Row gutter={40}>
                <Col span={12}>
                    <St.CustomerContent vertical align="center">
                        <Avatar src="" icon={<UserOutlined />} size={125} />
                        <Title level={1}>Dương Hoàng Nam</Title>
                        <Text>Ngày tham gia: 10/10/2023</Text>

                        <St.CustomerInfoItem vertical gap={10}>
                            <Title level={2}>Giao dịch</Title>

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
                            <Title level={2}>Báo cáo sử dụng hàng tháng</Title>

                            <St.CustomerInfoBox vertical gap={6}>
                                <Flex align="center" justify="space-between">
                                    <Text>Tháng:</Text>
                                    <RangePicker size="large" picker="month" locale={locale} />
                                </Flex>
                            </St.CustomerInfoBox>
                        </St.CustomerInfoItem>
                    </St.CustomerContent>
                </Col>

                <Col span={12}>
                    <St.CustomerInfo>
                        <Title level={2}>Thông tin cá nhân</Title>
                    </St.CustomerInfo>
                </Col>
            </Row>
        </St.CustomerWrapper>
    );
};

export default CustomerDetail;
