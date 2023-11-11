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
import CustomerTable from './components/Table/CustomerTable';
import StaffTable from './components/Table/StaffTable';
import { useEffect, useState } from 'react';
import { OverviewType } from './Dashboard.type';
import { getOverView } from '@/utils/dashboardAPI';

const { RangePicker } = DatePicker;
const Dashboard = () => {
    useDocumentTitle('Tổng Quan | HouseMate');
    const [startDate, setStartDate] = useState<Dayjs>(dayjs().add(-7, 'd'));
    const [overview, setOverview] = useState<OverviewType>({
        currentAllTransition: 0,
        beforeAllTransition: 0,
        percentAllTransition: 0,
        currentAllOrderPrice: 0,
        beforeAllOrderPrice: 0,
        percentAllOrderPrice: 0,
        totalCustomer: 0,
        currentAllNewGuest: 0,
        beforeAllNewGuest: 0,
        percentAllNewGuest: 0,
    });

    const onRangeChange = (dates: null | (Dayjs | null)[], _: string[]) => {
        if (dates) {
            setStartDate(dates[0] || startDate);
            getOverViewData(dates[0] || startDate);
        }
    };
    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: '7 ngày trước', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: '14 ngày trước', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: '30 ngày trước', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: '90 ngày trước', value: [dayjs().add(-90, 'd'), dayjs()] },
    ];

    const endDate = dayjs();
    const disabledEndDate = (current: Dayjs) => {
        // Disable dates after today for the end date
        return current && current > dayjs().endOf('day');
    };

    const getOverViewData = async (startDate: Dayjs) => {
        try {
            const days = endDate.diff(startDate, 'day');
            const { data }: { data: OverviewType } = await getOverView(days);
            setOverview(data);
        } catch (error) {
            console.error('Error fetching overview data:', error);
        }
    };
    useEffect(() => {
        getOverViewData(startDate);
    }, []);

    return (
        <div>
            <Row justify={'space-between'}>
                <Col>
                    <Styled.DashboardTitle>Báo cáo tổng quan</Styled.DashboardTitle>
                </Col>
                <Col>
                    <RangePicker
                        format={'DD/MM/YYYY'}
                        presets={rangePresets}
                        onChange={onRangeChange}
                        disabledDate={disabledEndDate}
                        value={[startDate, endDate]}
                    />
                </Col>
            </Row>
            <Divider />
            <Row justify={'space-between'}>
                <DashboardItem
                    icon={<AiOutlineStock size={36} />}
                    title="Số giao dịch mới"
                    data={overview?.currentAllTransition}
                    ratio={overview?.percentAllTransition}
                    color={theme.colors.success}
                    isDashboard={true}
                    days={endDate.diff(startDate, 'day')}
                />

                <DashboardItem
                    icon={<AiOutlineTransaction size={36} />}
                    title="Tổng doanh thu"
                    data={overview?.currentAllOrderPrice}
                    ratio={overview?.percentAllOrderPrice}
                    color={theme.colors.starIcon}
                    isDashboard={true}
                    days={endDate.diff(startDate, 'day')}
                />

                <DashboardItem
                    icon={<AiOutlineTeam size={36} />}
                    title="Tổng số khách hàng"
                    data={overview?.totalCustomer}
                    ratio={3.4}
                    color={theme.colors.primary}
                    isDashboard={true}
                    days={endDate.diff(startDate, 'day')}
                />

                <DashboardItem
                    icon={<AiOutlineTeam size={36} />}
                    title="Tổng số người dùng mới"
                    data={overview?.currentAllNewGuest}
                    ratio={overview?.percentAllNewGuest}
                    color={theme.colors.blue}
                    isDashboard={true}
                    days={endDate.diff(startDate, 'day')}
                />
            </Row>
            <Row style={{ marginTop: '30px' }}>
                <Col>
                    <RevenueChart overview={overview} />
                    <UserLineChart overview={overview} />
                </Col>
                <Col>
                    <Styled.PieChartWrapper>
                        <Styled.DashboardTitle level={3}>
                            Báo cáo thực hiện dịch vụ
                        </Styled.DashboardTitle>

                        <Col style={{ marginTop: '24px', marginBottom: '12px' }}>
                            <RangePicker
                                format={'DD/MM/YYYY'}
                                presets={rangePresets}
                                onChange={onRangeChange}
                                disabledDate={disabledEndDate}
                                value={[startDate, endDate]}
                            />
                        </Col>
                        <Col style={{ marginTop: '32px', marginBottom: '60px' }}>
                            <Styled.ChartName
                                level={2}
                                style={{ marginTop: '32px', marginBottom: '12px' }}
                            >
                                Tổng số dịch vụ thực hiện
                            </Styled.ChartName>
                            <Row align={'middle'}>
                                <Styled.ChartDetail level={3} style={{ marginTop: '0' }}>
                                    {100}
                                </Styled.ChartDetail>
                                <ItemRatio
                                    $isIncrease={100 > 0}
                                    style={{ fontSize: '1.2rem', marginBottom: '0' }}
                                >
                                    {100 < 0 ? (
                                        <BiDownArrowAlt size={20} />
                                    ) : (
                                        <BiUpArrowAlt size={20} />
                                    )}
                                    {100 < 0 ? (20 * -1).toFixed(2) : 20}% so với kỳ trước
                                </ItemRatio>
                            </Row>
                        </Col>
                        <Col>
                            <PieChart />
                        </Col>
                    </Styled.PieChartWrapper>
                </Col>
            </Row>
            <Row style={{ marginBottom: '30px' }}>
                <TopService />
            </Row>
            <Row style={{ marginBottom: '30px' }}>
                <CustomerTable />
            </Row>
            <Row>
                <StaffTable />
            </Row>
        </div>
    );
};

export default Dashboard;
