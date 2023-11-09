import { Col, DatePicker, Row } from 'antd';
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
        totalSessionView: 4,
    },
    {
        serviceName: 'Dịch vụ giao nước tinh khiết Bidrico 19L',
        totalPrice: 253500,
        numberOfSold: 7,
        totalSessionView: 1,
    },
    {
        serviceName: 'Dịch vụ nhà cửa sinh viên FPT',
        totalPrice: 1399000,
        numberOfSold: 1,
        totalSessionView: 1,
    },
    {
        serviceName: 'Giao gạo Thơm Lài Lotus Rice 5kg',
        totalPrice: 492000,
        numberOfSold: 16,
        totalSessionView: 1,
    },
    {
        serviceName: 'Gói dịch vụ nhà có mẹ',
        totalPrice: 520000,
        numberOfSold: 6,
        totalSessionView: 1,
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
        <Styled.TopServiceWrapper>
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
        </Styled.TopServiceWrapper>
    );
};

export default TopService;
