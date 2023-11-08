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
                            (100 * (tooltipItems[1].parsed.y - tooltipItems[0].parsed.y)) /
                            tooltipItems[1].parsed.y
                        ).toFixed(2),
                    );

                    return 'Rate: ' + rate + '%';
                },
            },
        },
    },
};

interface User {
    year: string;
    month: string;
    day: string;
    pageTitle: string;
    sessions: string;
    newUsers: string;
    activeUsers: string;
    eventCount: string;
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
        year: '2023',
        month: '10',
        day: '20',
        pageTitle: 'HouseMate - Student House Membership Cart',
        sessions: '2',
        newUsers: '0',
        activeUsers: '2',
        eventCount: '49',
    },
    {
        year: '2023',
        month: '10',
        day: '22',
        pageTitle: 'Cửa Hàng | HouseMate',
        sessions: '4',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '18',
    },
    {
        year: '2023',
        month: '10',
        day: '25',
        pageTitle: 'Dịch Vụ Của Tôi | HouseMate',
        sessions: '8',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '8',
    },
    {
        year: '2023',
        month: '10',
        day: '26',
        pageTitle: 'Dịch Vụ | Dịch vụ giặt quần áo trắng | HouseMate',
        sessions: '1',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '3',
    },
    {
        year: '2023',
        month: '10',
        day: '27',
        pageTitle: 'Dịch Vụ | Giao gạo Thơm Lài Lotus Rice 5kg | HouseMate',
        sessions: '1',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '1',
    },
    {
        year: '2023',
        month: '10',
        day: '28',
        pageTitle: 'Dịch vụ giặt quần áo trắng | HouseMate',
        sessions: '9',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '2',
    },
    {
        year: '2023',
        month: '10',
        day: '30',
        pageTitle: 'Giỏ Hàng | HouseMate',
        sessions: '1',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '3',
    },
    {
        year: '2023',
        month: '10',
        day: '31',
        pageTitle: 'Login | HouseMate',
        sessions: '5',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '2',
    },
    {
        year: '2023',
        month: '11',
        day: '03',
        pageTitle: 'Lịch Sử Dụng | HouseMate',
        sessions: '1',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '4',
    },
    {
        year: '2023',
        month: '11',
        day: '01',
        pageTitle: 'Quên Mật Khẩu | HouseMate',
        sessions: '1',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '1',
    },
    {
        year: '2023',
        month: '11',
        day: '02',
        pageTitle: 'Sắp Đến | HouseMate',
        sessions: '1',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '1',
    },
    {
        year: '2023',
        month: '11',
        day: '03',
        pageTitle: 'Thông Tin Cá Nhân | HouseMate',
        sessions: '1',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '1',
    },
    {
        year: '2023',
        month: '11',
        day: '04',
        pageTitle: 'Tìm Việc Mới | HouseMate',
        sessions: '1',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '3',
    },
    {
        year: '2023',
        month: '11',
        day: '04',
        pageTitle: 'Đã Hoàn Thành | HouseMate',
        sessions: '1',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '1',
    },
    {
        year: '2023',
        month: '11',
        day: '05',
        pageTitle: 'Đăng Ký | HouseMate',
        sessions: '1',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '1',
    },
    {
        year: '2023',
        month: '11',
        day: '06',
        pageTitle: 'Đăng Nhập | HouseMate',
        sessions: '1',
        newUsers: '0',
        activeUsers: '1',
        eventCount: '8',
    },
];

const newFakeData = [
    {
        year: '2023',
        month: '11',
        day: '07',
        pageTitle: 'Page 1',
        sessions: '10',
        newUsers: '2',
        activeUsers: '8',
        eventCount: '20',
    },
    {
        year: '2023',
        month: '11',
        day: '08',
        pageTitle: 'Page 2',
        sessions: '2',
        newUsers: '3',
        activeUsers: '9',
        eventCount: '22',
    },
    {
        year: '2023',
        month: '11',
        day: '09',
        pageTitle: 'Page 3',
        sessions: '15',
        newUsers: '5',
        activeUsers: '10',
        eventCount: '25',
    },
    {
        year: '2023',
        month: '11',
        day: '10',
        pageTitle: 'Page 4',
        sessions: '18',
        newUsers: '7',
        activeUsers: '12',
        eventCount: '30',
    },
    {
        year: '2023',
        month: '11',
        day: '11',
        pageTitle: 'Page 5',
        sessions: '20',
        newUsers: '8',
        activeUsers: '15',
        eventCount: '35',
    },
    {
        year: '2023',
        month: '11',
        day: '12',
        pageTitle: 'Page 6',
        sessions: '22',
        newUsers: '10',
        activeUsers: '18',
        eventCount: '40',
    },
    {
        year: '2023',
        month: '11',
        day: '13',
        pageTitle: 'Page 7',
        sessions: '25',
        newUsers: '12',
        activeUsers: '20',
        eventCount: '45',
    },
    // Add more data as needed
];

const data = {
    labels: labels.reverse(),
    datasets: [
        {
            label: 'Total Sessions',
            data: users.map((user) => user.sessions),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderDash: [5, 5],
        },
        {
            label: 'Dataset 2',
            data: newFakeData.map((data) => data.sessions),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

function UserLineChart() {
    showLabels(7, 1);

    return <Line height="363px" width="727px" options={options} data={data} />;
}

export default UserLineChart;
