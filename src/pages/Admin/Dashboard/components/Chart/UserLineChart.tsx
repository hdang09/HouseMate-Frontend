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
                    return `${dayjs(currentDate).locale('vi').format('ddd, MMM D, YYYY')} vs ${dayjs
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

interface User {
    date: string;
    totalActiveUser: number;
    totalNewUser: number;
    percentActiveUser: number;
    percentNewUser: number;
}

const beforeNewUsers: User[] = [
    {
        date: '2023-10-26',
        totalActiveUser: 32,
        totalNewUser: 21,
        percentActiveUser: 190.9090909090909,
        percentNewUser: 950,
    },
    {
        date: '2023-10-27',
        totalActiveUser: 14,
        totalNewUser: 8,
        percentActiveUser: 16.666666666666664,
        percentNewUser: 300,
    },
    {
        date: '2023-10-28',
        totalActiveUser: 13,
        totalNewUser: 6,
        percentActiveUser: 44.44444444444444,
        percentNewUser: 100,
    },
    {
        date: '2023-10-29',
        totalActiveUser: 8,
        totalNewUser: 4,
        percentActiveUser: 14.285714285714285,
        percentNewUser: 300,
    },
    {
        date: '2023-10-30',
        totalActiveUser: 17,
        totalNewUser: 13,
        percentActiveUser: 88.88888888888889,
        percentNewUser: 1200,
    },
    {
        date: '2023-10-31',
        totalActiveUser: 6,
        totalNewUser: 1,
        percentActiveUser: 600,
        percentNewUser: 100,
    },
    {
        date: '2023-11-01',
        totalActiveUser: 8,
        totalNewUser: 2,
        percentActiveUser: -12.5,
        percentNewUser: -50,
    },
];

const currentNewUsers = [
    {
        date: '2023-11-08',
        totalActiveUser: 6,
        totalNewUser: 0,
        percentActiveUser: -33.33333333333333,
        percentNewUser: -100,
    },
    {
        date: '2023-11-07',
        totalActiveUser: 17,
        totalNewUser: 1,
        percentActiveUser: -47.05882352941176,
        percentNewUser: -92.3076923076923,
    },
    {
        date: '2023-11-06',
        totalActiveUser: 8,
        totalNewUser: 1,
        percentActiveUser: -12.5,
        percentNewUser: -75,
    },
    {
        date: '2023-11-05',
        totalActiveUser: 13,
        totalNewUser: 3,
        percentActiveUser: -30.76923076923077,
        percentNewUser: -50,
    },
    {
        date: '2023-11-04',
        totalActiveUser: 14,
        totalNewUser: 2,
        percentActiveUser: -14.285714285714285,
        percentNewUser: -75,
    },
    {
        date: '2023-11-03',
        totalActiveUser: 32,
        totalNewUser: 2,
        percentActiveUser: -65.625,
        percentNewUser: -90.47619047619048,
    },
    {
        date: '2023-11-02',
        totalActiveUser: 13,
        totalNewUser: 6,
        percentActiveUser: 7.6923076923076925,
        percentNewUser: -33.33333333333333,
    },
];

const labels: string[] = [...currentNewUsers.map((user) => user.date)];

const data = {
    labels: labels.reverse(),
    datasets: [
        {
            label: '7 ngày gần đây',
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

function UserLineChart() {
    // showLabels(7, 1);

    return <Line height="363px" width="727px" options={options} data={data} />;
}

export default UserLineChart;
