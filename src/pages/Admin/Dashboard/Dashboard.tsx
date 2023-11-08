import { useDocumentTitle } from '@/hooks';
import { Col, Divider, Row } from 'antd';
import DashboardItem from './components/DashboardItem';
import { AiOutlineStock, AiOutlineTeam, AiOutlineTransaction } from 'react-icons/ai';
import { theme } from '@/themes';
import UserLineChart from '@/pages/Admin/Dashboard/components/Chart/UserLineChart';
import * as Styled from './Dashboard.styled';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { TimeRangePickerProps } from 'antd';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;
const Dashboard = () => {
    useDocumentTitle('Tổng Quan | HouseMate');
    const overview = {
        currentAllTransition: 10,
        beforeAllTransition: 40,
        percentAllTransition: -75,
        currentAllOrderPrice: 17082600,
        beforeAllOrderPrice: 19966000,
        percentAllOrderPrice: -14.441550636081338,
        totalCustomer: 16,
        currentAllNewGuest: 17,
        beforeAllNewGuest: 64,
        percentAllNewGuest: -73.4375,
    };

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
        <div>
            <Row justify={'space-between'}>
                <Col>
                    <Styled.DashboardTitle>Báo cáo tổng quan</Styled.DashboardTitle>
                </Col>
                <Col>
                    <RangePicker presets={rangePresets} onChange={onRangeChange} />
                </Col>
            </Row>
            <Divider />
            <Row justify={'space-between'}>
                <DashboardItem
                    icon={<AiOutlineStock size={36} />}
                    title="Số giao dịch mới"
                    data={overview.currentAllTransition}
                    ratio={overview.percentAllTransition}
                    color={theme.colors.success}
                />

                <DashboardItem
                    icon={<AiOutlineTransaction size={36} />}
                    title="Tổng doanh thu"
                    data={overview.currentAllOrderPrice}
                    ratio={overview.percentAllOrderPrice}
                    color={theme.colors.starIcon}
                />

                <DashboardItem
                    icon={<AiOutlineTeam size={36} />}
                    title="Tổng số khách hàng"
                    data={overview.totalCustomer}
                    ratio={3.4}
                    color={theme.colors.primary}
                />

                <DashboardItem
                    icon={<AiOutlineTeam size={36} />}
                    title="Tổng số người dùng mới"
                    data={overview.currentAllNewGuest}
                    ratio={overview.percentAllNewGuest}
                    color={theme.colors.secondary}
                />
            </Row>
            <Row style={{ marginTop: '30px' }}>
                <Col>
                    <Styled.ChartWrapper>
                        <Row justify={'end'} style={{ marginBottom: '20px' }}>
                            <RangePicker presets={rangePresets} onChange={onRangeChange} />
                        </Row>
                        <UserLineChart />
                    </Styled.ChartWrapper>
                </Col>
            </Row>
        </div>
    );
};

Dashboard.propTypes = {};

export default Dashboard;
