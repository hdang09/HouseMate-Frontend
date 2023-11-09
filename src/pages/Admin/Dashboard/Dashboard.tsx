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
import { ItemRatio } from './components/DashboardItem/DashboardItem.styled';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import RevenueChart from './components/Chart/RevenueChart';
import PieChart from './components/Chart/PieChart';
import TopService from './components/Table/TopService';

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
                    color={theme.colors.blue}
                />
            </Row>
            <Row style={{ marginTop: '30px' }}>
                <Col>
                    <Styled.ChartWrapper>
                        <Row justify={'space-between'} style={{ marginBottom: '20px' }}>
                            <Col>
                                <Styled.ChartName level={2}>Tổng doanh thu</Styled.ChartName>
                                <Styled.ChartDetail level={3}>
                                    {overview.currentAllOrderPrice.toLocaleString()}
                                </Styled.ChartDetail>
                                <ItemRatio
                                    isIncrease={overview.percentAllOrderPrice > 0}
                                    style={{ marginTop: '4px', fontSize: '1.2rem' }}
                                >
                                    {overview.percentAllOrderPrice < 0 ? (
                                        <BiDownArrowAlt size={20} />
                                    ) : (
                                        <BiUpArrowAlt size={20} />
                                    )}
                                    {overview.percentAllOrderPrice < 0
                                        ? (overview.percentAllOrderPrice * -1).toFixed(2)
                                        : overview.percentAllOrderPrice.toFixed(2)}
                                    % so với kỳ trước
                                </ItemRatio>
                            </Col>
                            <Col>
                                <RangePicker presets={rangePresets} onChange={onRangeChange} />
                            </Col>
                        </Row>
                        <RevenueChart />
                    </Styled.ChartWrapper>

                    <Styled.ChartWrapper>
                        <Row justify={'space-between'} style={{ marginBottom: '20px' }}>
                            <Col>
                                <Styled.ChartName level={2}>Người dùng mới</Styled.ChartName>
                                <Styled.ChartDetail level={3}>
                                    {overview.currentAllNewGuest.toLocaleString()}
                                </Styled.ChartDetail>
                                <ItemRatio
                                    isIncrease={overview.currentAllNewGuest > 0}
                                    style={{ marginTop: '4px', fontSize: '1.2rem' }}
                                >
                                    {overview.percentAllNewGuest < 0 ? (
                                        <BiDownArrowAlt size={20} />
                                    ) : (
                                        <BiUpArrowAlt size={20} />
                                    )}
                                    {overview.percentAllNewGuest < 0
                                        ? (overview.percentAllNewGuest * -1).toFixed(2)
                                        : overview.percentAllNewGuest.toFixed(2)}
                                    % so với kỳ trước
                                </ItemRatio>
                            </Col>
                            <Col>
                                <RangePicker presets={rangePresets} onChange={onRangeChange} />
                            </Col>
                        </Row>
                        <UserLineChart />
                    </Styled.ChartWrapper>
                </Col>
                <Col>
                    <Styled.PieChartWrapper>
                        <Styled.DashboardTitle level={3}>
                            Báo cáo thực hiện dịch vụ
                        </Styled.DashboardTitle>
                        <Col style={{ marginTop: '16px', marginBottom: '32px' }}>
                            <RangePicker presets={rangePresets} onChange={onRangeChange} />
                        </Col>
                        <Col>
                            <PieChart />
                        </Col>
                    </Styled.PieChartWrapper>
                </Col>
            </Row>
            <Row>
                <TopService />
            </Row>
        </div>
    );
};

export default Dashboard;
