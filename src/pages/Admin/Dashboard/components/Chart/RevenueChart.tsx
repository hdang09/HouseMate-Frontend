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
import 'dayjs/locale/en';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { theme } from '@/themes';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('vi');

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
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
                    return `${dayjs(currentDate).format('ddd, MMM D, YYYY')} vs ${dayjs
                        .tz(prevDate, 'Asia/Ho_Chi_Minh')
                        .locale('vi')
                        .format('ddd, MMM D, YYYY')}`;
                },
                footer: function (tooltipItems: any[]) {
                    const index = tooltipItems[0].dataIndex;
                    let rate = current[index].percentAllOrderPrice.toFixed(2);
                    return 'Rate: ' + rate + '%';
                },
            },
        },
    },
};

interface RevenueType {
    date: string;
    allOrderPrice: number;
    percentAllOrderPrice: number;
}

const beforeNewUsers: RevenueType[] = [
    {
        date: '2023-11-06',
        allOrderPrice: 9450000,
        percentAllOrderPrice: 945000000,
    },
    {
        date: '2023-11-05',
        allOrderPrice: 0,
        percentAllOrderPrice: -100,
    },
];

const current: RevenueType[] = [
    {
        date: '2023-11-08',
        allOrderPrice: 0,
        percentAllOrderPrice: -100,
    },
    {
        date: '2023-11-07',
        allOrderPrice: 1184000,
        percentAllOrderPrice: 118400000,
    },
];

const labels: string[] = [...current.map((user) => user.date)];

const data = {
    labels: labels.reverse(),
    datasets: [
        {
            label: '7 ngày gần đây',
            data: current.reverse().map((user) => user.allOrderPrice),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Kỳ trước',
            data: beforeNewUsers.map((data) => data.allOrderPrice),
            borderColor: theme.colors.primary,
            backgroundColor: '#FF9F40',
            borderDash: [5, 5],
        },
    ],
};

function RevenueChart() {
    // showLabels(7, 1);

    return <Line height="363px" width="727px" options={options} data={data} />;
}

export default RevenueChart;
