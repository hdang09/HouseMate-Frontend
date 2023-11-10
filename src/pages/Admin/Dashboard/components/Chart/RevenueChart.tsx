import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    CartesianScaleOptions,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import * as Styled from '../../Dashboard.styled';
import { theme } from '@/themes';
import { Col, DatePicker, Row } from 'antd';
import { ItemRatio } from '../DashboardItem/DashboardItem.styled';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import { TimeRangePickerProps } from 'antd/lib';
import { OverviewType } from '../../Dashboard.type';
import { useEffect, useState } from 'react';
import { getRevenueChart } from '@/utils/dashboardAPI';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('vi');
const { RangePicker } = DatePicker;
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface RevenueType {
    date: string;
    allOrderPrice: number;
    percentAllOrderPrice: number;
}

interface RevenueData {
    current: RevenueType[];
    before: RevenueType[];
}

function RevenueChart({ overview }: { overview: OverviewType }) {
    const [currentRevenue, setCurrentRevenue] = useState<RevenueType[]>([]);
    const [beforeRevenue, setBeforeRevenue] = useState<RevenueType[]>([]);
    const [startDate, setStartDate] = useState<Dayjs>(dayjs().add(-7, 'd'));
    const endDate = dayjs();

    const getUserData = async (startDate: Dayjs) => {
        try {
            const days = endDate.diff(startDate, 'day');
            const { data }: { data: RevenueData } = await getRevenueChart(days - 1);
            console.log(data);
            setCurrentRevenue(data.current);
            setBeforeRevenue(data.before);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUserData(startDate);
    }, []);

    const labels: string[] = [...currentRevenue.map((user) => user.date)];

    const data = {
        labels: labels.reverse(),
        datasets: [
            {
                label: `${endDate.diff(startDate, 'day')} ngày gần đây`,
                data: currentRevenue.reverse().map((user) => user.allOrderPrice),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Kỳ trước',
                data: beforeRevenue.map((data) => data.allOrderPrice),
                borderColor: theme.colors.primary,
                backgroundColor: '#FF9F40',
                borderDash: [5, 5],
            },
        ],
    };

    const options = {
        aspectRatio: 2,
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false, // Set to false to hide x-axis labels
                },
            },
            y: {
                type: 'linear',
                position: 'right',
            } as unknown as CartesianScaleOptions,
        },
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                usePointStyle: true,
                callbacks: {
                    title: function (tooltipItems: any[]) {
                        const index = tooltipItems[0].dataIndex;
                        const currentDate = tooltipItems[0].label;

                        const prevDate = new Date(beforeRevenue[index]?.date);
                        return `${dayjs(currentDate).format('ddd, MMM D, YYYY')} vs ${dayjs
                            .tz(prevDate, 'Asia/Ho_Chi_Minh')
                            .locale('vi')
                            .format('ddd, MMM D, YYYY')}`;
                    },
                    footer: function (tooltipItems: any[]) {
                        const index = tooltipItems[0].dataIndex;
                        let rate = currentRevenue[index].percentAllOrderPrice.toFixed(2);
                        return 'Rate: ' + rate + '%';
                    },
                },
            },
        },
    };

    const onRangeChange = (dates: null | (Dayjs | null)[], _: string[]) => {
        if (dates) {
            setStartDate(dates[0] || startDate);
            // getOverViewData(dates[0] || startDate);
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

    const disabledEndDate = (current: Dayjs) => {
        // Disable dates after today for the end date
        return current && current > dayjs().endOf('day');
    };

    return (
        <Styled.ChartWrapper>
            <Row justify={'space-between'} style={{ marginBottom: '20px' }}>
                <Col>
                    <Styled.ChartName level={2}>Tổng doanh thu</Styled.ChartName>
                    <Styled.ChartDetail level={3}>
                        {overview?.currentAllOrderPrice.toLocaleString()}
                    </Styled.ChartDetail>
                    <ItemRatio
                        isIncrease={overview?.percentAllOrderPrice > 0}
                        style={{ marginTop: '4px', fontSize: '1.2rem' }}
                    >
                        {overview?.percentAllOrderPrice < 0 ? (
                            <BiDownArrowAlt size={20} />
                        ) : (
                            <BiUpArrowAlt size={20} />
                        )}
                        {overview?.percentAllOrderPrice < 0
                            ? (overview?.percentAllOrderPrice * -1).toFixed(2)
                            : overview?.percentAllOrderPrice.toFixed(2)}
                        % so với kỳ trước
                    </ItemRatio>
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
            <Line height="363px" width="727px" options={options} data={data} />
        </Styled.ChartWrapper>
    );
}

export default RevenueChart;
