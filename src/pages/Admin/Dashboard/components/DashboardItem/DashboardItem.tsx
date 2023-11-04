import { Divider, Flex, Statistic, Typography } from 'antd';
import CountUp from 'react-countup';

import * as St from './DashboardItem.styled';

const { Paragraph, Text } = Typography;

export type DashboardItemProps = {
    icon: JSX.Element;
    title: string;
    data: number;
    ratio: number;
    color?: string;
};

const formatter = (value: number) => <CountUp end={value} separator="," />;

const DashboardItem = ({ icon, title, data, ratio, color }: DashboardItemProps) => {
    return (
        <St.ItemWrapper vertical $color={color || ''}>
            <Flex gap={16}>
                {icon}

                <St.ItemData vertical gap={4} $color={color || ''}>
                    <Statistic title={title} value={data} formatter={formatter} />
                </St.ItemData>
            </Flex>

            <Divider />

            <St.ItemRatio>+ {ratio}% so với tháng trước</St.ItemRatio>
        </St.ItemWrapper>
    );
};

export default DashboardItem;
