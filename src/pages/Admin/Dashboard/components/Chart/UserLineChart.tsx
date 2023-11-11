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
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import * as Styled from '../../Dashboard.styled';
import 'dayjs/locale/en';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { theme } from '@/themes';
import { useEffect, useState } from 'react';
import { getUserChart } from '@/utils/dashboardAPI';
import { Col, DatePicker, Row } from 'antd';
import { OverviewType } from '../../Dashboard.type';
import { ItemRatio } from '../DashboardItem/DashboardItem.styled';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import { TimeRangePickerProps } from 'antd/lib';
import { ExportToExcel } from '../Excel/ExportCustomer';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('vi');

const { RangePicker } = DatePicker;
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface User {
    date: string;
    totalActiveUser: number;
    totalNewUser: number;
    percentActiveUser: number;
    percentNewUser: number;
}

interface UserData {
    current: User[];
    before: User[];
}

function UserLineChart({ overview }: { overview: OverviewType }) {
    const [currentNewUsers, setCurrentNewUsers] = useState<User[]>([]);
    const [beforeNewUsers, setBeforeNewUsers] = useState<User[]>([]);
    const [startDate, setStartDate] = useState<Dayjs>(dayjs().add(-7, 'd'));
    const endDate = dayjs();
    const fileName = 'Thống kê người dùng mới';
    const getUserData = async (startDate: Dayjs) => {
        try {
            const days = endDate.diff(startDate, 'day');
            const { data }: { data: UserData } = await getUserChart(days - 1);
            setCurrentNewUsers(data.current);
            setBeforeNewUsers(data.before);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUserData(startDate);
    }, []);

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

                        const prevDate = new Date(beforeNewUsers[index]?.date);
                        return `${dayjs(currentDate)
                            .locale('vi')
                            .format('ddd, MMM D, YYYY')} vs ${dayjs
                            .tz(prevDate, 'Asia/Ho_Chi_Minh')
                            .locale('vi')
                            .format('ddd, MMM D, YYYY')}`;
                    },
                    footer: function (tooltipItems: any[]) {
                        const index = tooltipItems[0].dataIndex;
                        let rate = currentNewUsers[index].percentNewUser.toFixed(2);
                        return 'Rate: ' + rate + '%';
                    },
                },
            },
        },
    };

    const labels: string[] = [...currentNewUsers.map((user) => user.date)];

    const data = {
        labels: labels,
        datasets: [
            {
                label: `${endDate.diff(startDate, 'day')} ngày gần đây`,
                data: currentNewUsers.reverse().map((user) => user.totalNewUser),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Kỳ trước',
                data: beforeNewUsers.map((data) => data.totalNewUser),
                borderColor: theme.colors.primary,
                backgroundColor: '#FF9F40',
                borderDash: [5, 5],
            },
        ],
    };

    const onRangeChange = (dates: null | (Dayjs | null)[], _: string[]) => {
        if (dates) {
            setStartDate(dates[0] || startDate);
            getUserData(dates[0] || startDate);
            console.log(dates);
        } else {
            console.log('Clear');
        }
    };
    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: '7 ngày trước', value: [dayjs().add(-7, 'd'), dayjs()] },
        { label: '14 ngày trước', value: [dayjs().add(-14, 'd'), dayjs()] },
        { label: '30 ngày trước', value: [dayjs().add(-30, 'd'), dayjs()] },
        { label: '90 ngày trước', value: [dayjs().add(-90, 'd'), dayjs()] },
    ];

    const disabledEndDate = (current: Dayjs) => {
        // Disable dates after today for the end date
        return current && current > dayjs().endOf('day');
    };

    return (
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
                    <Col>
                        <RangePicker
                            format={'DD/MM/YYYY'}
                            presets={rangePresets}
                            onChange={onRangeChange}
                            disabledDate={disabledEndDate}
                            value={[startDate, endDate]}
                        />
                    </Col>
                    <Row justify={'end'} style={{ marginTop: '12px' }}>
                        <ExportToExcel apiData={currentNewUsers} fileName={fileName} />
                    </Row>
                </Col>
            </Row>
            <Line height="363px" width="727px" options={options} data={data} />
        </Styled.ChartWrapper>
    );
}

export default UserLineChart;
