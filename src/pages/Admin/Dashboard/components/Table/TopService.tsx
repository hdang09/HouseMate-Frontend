import { Col, DatePicker, Flex, Image, Pagination, Progress, Row } from 'antd';
import * as Styled from '../../Dashboard.styled';
import { TimeRangePickerProps } from 'antd/lib';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
const { RangePicker } = DatePicker;
const data = [
    {
        serviceName: 'Dịch vụ giặt quần áo trắng',
        totalPrice: 158000,
        numberOfSold: 17,
        totalSessionView: 19,
    },
    {
        serviceName: 'Dịch vụ giao nước tinh khiết Bidrico 19L',
        totalPrice: 253500,
        numberOfSold: 7,
        totalSessionView: 15,
    },
    {
        serviceName: 'Dịch vụ nhà cửa sinh viên FPT',
        totalPrice: 1399000,
        numberOfSold: 1,
        totalSessionView: 12,
    },
    {
        serviceName: 'Giao gạo Thơm Lài Lotus Rice 5kg',
        totalPrice: 492000,
        numberOfSold: 16,
        totalSessionView: 5,
    },
    {
        serviceName: 'Gói dịch vụ nhà có mẹ',
        totalPrice: 520000,
        numberOfSold: 6,
        totalSessionView: 4,
    },
];

const TopService = () => {
    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    };
    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
    ];

    return (
        <Styled.Wrapper>
            <Row justify={'space-between'} align={'middle'}>
                <Col>
                    <Styled.DashboardTitle level={3}>
                        Top các dịch vụ được quan tâm nhất
                    </Styled.DashboardTitle>
                </Col>
                <Col style={{ marginTop: '16px', marginBottom: '32px' }}>
                    <RangePicker presets={rangePresets} onChange={onRangeChange} />
                </Col>
            </Row>
            <Row justify={'space-between'} style={{ marginBottom: '16px' }}>
                <Col>
                    <Styled.TopServiceHeader>Hình ảnh và tên dịch vụ</Styled.TopServiceHeader>
                </Col>

                <Row justify={'space-between'} style={{ width: '500px' }}>
                    <Col>
                        <Styled.TopServiceHeader>Số lượt bán</Styled.TopServiceHeader>
                    </Col>
                    <Col>
                        <Styled.TopServiceHeader>Doanh thu</Styled.TopServiceHeader>
                    </Col>
                    <Col>
                        <Styled.TopServiceHeader>Số lượt xem</Styled.TopServiceHeader>
                    </Col>
                </Row>
            </Row>

            {data.map((service, index) => {
                return (
                    <Flex align={'center'} gap={10} style={{ marginBottom: '16px' }}>
                        <Image
                            src="https://www.cleanipedia.com/images/5iwkm8ckyw6v/011rSLKeHEneGpP992LQvX/54c881c1a88b961c64154d26b47bd0b8/NGQ3Y2I0NGIwMDAwMDU3OC01ODcwNzQ3LWltYWdlLWEtMTE1Mjk2NTEzODg2NzktMTU3NTkwNDQwMTU0NzgyMjI4NDgwMS1jcm9wLTE1NzU5MDQ0MDUzOTA3NDAxOTk0ODQuanBn/640w-427h/m%E1%BA%B9o-gi%E1%BA%B7t-%C4%91%E1%BB%93-nh%C6%B0-m%E1%BB%99t-chuy%C3%AAn-gia.jpg"
                            width={60}
                            height={60}
                            style={{
                                borderRadius: '8px',
                                objectFit: 'cover',
                                marginRight: '10px',
                            }}
                        />
                        <Row
                            justify={'space-between'}
                            style={{ marginBottom: '16px', width: '100%' }}
                            key={index}
                        >
                            <Col>
                                <Styled.TopServiceContent>
                                    {service.serviceName}
                                </Styled.TopServiceContent>
                            </Col>

                            <Row
                                justify={'space-between'}
                                align={'middle'}
                                style={{ width: '500px' }}
                            >
                                <Col>
                                    <Styled.TopServiceContent>
                                        {service.numberOfSold.toLocaleString()}
                                    </Styled.TopServiceContent>
                                </Col>
                                <Col>
                                    <Styled.TopServiceContent>
                                        {service.totalPrice.toLocaleString()}
                                    </Styled.TopServiceContent>
                                </Col>
                                <Col>
                                    <Styled.TopServiceContent>
                                        {service.totalSessionView.toLocaleString()}
                                    </Styled.TopServiceContent>
                                </Col>
                            </Row>
                            <Progress
                                percent={Math.floor(
                                    (data[index].totalSessionView /
                                        (data[0].totalSessionView + 1)) *
                                        100,
                                )}
                                showInfo={false}
                                style={{ marginBottom: '0' }}
                            />
                        </Row>
                    </Flex>
                );
            })}
            <Row justify={'end'}>
                <Pagination defaultCurrent={1} total={50} />
            </Row>
        </Styled.Wrapper>
    );
};

export default TopService;
