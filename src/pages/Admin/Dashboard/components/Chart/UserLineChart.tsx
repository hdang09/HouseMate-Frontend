import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    aspectRatio: 2,
    responsive: true,
    scales: {
        y: {
            grid: {
                display: false,
            },
            min: 0, // Set the minimum value for the Y-axis
            max: 50, // Set the maximum value for the Y-axis
        },
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
                footer: function (tooltipItems: any[]) {
                    console.log(tooltipItems);
                    let rate = 0;

                    rate = Number.parseInt(
                        (
                            (100 * (tooltipItems[0].parsed.y - tooltipItems[1].parsed.y)) /
                            tooltipItems[0].parsed.y
                        ).toFixed(2),
                    );

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

const labels: string[] = [];

const showLabels = (numberOfDays: number, interval: number) => {
    const currentDate = new Date();
    labels.push(currentDate.getDate().toString()); // Add the label for today

    for (let i = 0; i * interval < numberOfDays - 1; i++) {
        const previousDate = new Date(currentDate);
        previousDate.setDate(currentDate.getDate() - (i + 1) * interval); // Calculate the previous date
        labels.push(previousDate.getDate().toString()); // Add the label for the previous date
    }
};
const users: User[] = [
    {
        date: '2023-10-31',
        totalActiveUser: 6,
        totalNewUser: 1,
        percentActiveUser: 600,
        percentNewUser: 100,
    },
    {
        date: '2023-10-30',
        totalActiveUser: 17,
        totalNewUser: 13,
        percentActiveUser: 88.88888888888889,
        percentNewUser: 1200,
    },
    {
        date: '2023-10-29',
        totalActiveUser: 8,
        totalNewUser: 4,
        percentActiveUser: 14.285714285714285,
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
        date: '2023-10-27',
        totalActiveUser: 14,
        totalNewUser: 8,
        percentActiveUser: 16.666666666666664,
        percentNewUser: 300,
    },
    {
        date: '2023-10-26',
        totalActiveUser: 32,
        totalNewUser: 21,
        percentActiveUser: 190.9090909090909,
        percentNewUser: 950,
    },
    {
        date: '2023-10-25',
        totalActiveUser: 13,
        totalNewUser: 9,
        percentActiveUser: -7.142857142857142,
        percentNewUser: 50,
    },
    {
        date: '2023-10-24',
        totalActiveUser: 8,
        totalNewUser: 4,
        percentActiveUser: 14.285714285714285,
        percentNewUser: 100,
    },
];

const newFakeData = [
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
    {
        date: '2023-11-01',
        totalActiveUser: 8,
        totalNewUser: 2,
        percentActiveUser: -12.5,
        percentNewUser: -50,
    },
];

const data = {
    labels: labels.reverse(),
    datasets: [
        {
            label: '7 ngày gần đây',
            data: users.map((user) => user.totalNewUser),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Kỳ trước',
            data: newFakeData.map((data) => data.totalNewUser),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderDash: [5, 5],
        },
    ],
};

function UserLineChart() {
    showLabels(7, 1);

    return <Line height="363px" width="727px" options={options} data={data} />;
}

export default UserLineChart;
