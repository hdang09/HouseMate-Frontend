import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import * as Styled from '../../Dashboard.styled';
import { ItemRatio } from '../DashboardItem/DashboardItem.styled';

ChartJS.register(ArcElement, Tooltip, Legend);

const currentTasks = [
    {
        allOffTask: 12,
        percent: 40,
        percentBefore: -20,
    },
    {
        allOffTask: 19,
        percent: 45,
        percentBefore: 20,
    },
    {
        allOffTask: 3,
        percent: 10,
        percentBefore: 20,
    },
    {
        allOffTask: 5,
        percent: 15,
        percentBefore: 20,
    },
];

export const data = {
    labels: [
        'Dịch vụ thực hiện thành công',
        'Dịch vụ thực hiện thất bại',
        'Dịch vụ đang xử lí',
        'Dịch vụ đang chờ thực hiện ',
    ],
    datasets: [
        {
            label: 'Số lượng công việc',
            data: currentTasks.map((task) => task.allOffTask),
            backgroundColor: [
                'rgba(82, 196, 26, 0.8)',
                'rgba(255, 0, 0, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(191, 191, 191, 0.8)',
            ],
            borderColor: [
                'rgba(82, 196, 26, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(191, 191, 191, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options: ChartOptions<'doughnut'> = {
    scales: {
        r: {
            type: 'linear',
            display: false,
            // other radial scale options
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
};
export default function PieChart() {
    return (
        <div>
            <Doughnut data={data} options={options} />
            {/* Custom Legend */}
            <Styled.LegendWrapper>
                {data.labels.map((label, index) => (
                    <Styled.LegendList key={index}>
                        <Styled.LegendLabel
                            style={{
                                backgroundColor: data.datasets[0].backgroundColor[index],
                            }}
                        />
                        <Styled.LegendContent>
                            <span>{label}</span>
                            <Styled.LegendNumber>
                                <span>{currentTasks[index].percent}%</span>
                                <span>{data.datasets[0].data[index]}</span>
                                <ItemRatio
                                    isIncrease={currentTasks[index].percentBefore > 0}
                                    style={{ fontSize: '1.2rem' }}
                                >
                                    {currentTasks[index].percentBefore < 0 ? (
                                        <BiDownArrowAlt size={20} />
                                    ) : (
                                        <BiUpArrowAlt size={20} />
                                    )}
                                    {currentTasks[index].percentBefore < 0
                                        ? (currentTasks[index].percentBefore * -1).toFixed(2)
                                        : currentTasks[index].percentBefore.toFixed(2)}
                                    %
                                </ItemRatio>
                            </Styled.LegendNumber>
                        </Styled.LegendContent>
                    </Styled.LegendList>
                ))}
            </Styled.LegendWrapper>
        </div>
    );
}
