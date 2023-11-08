import { Divider, Flex, Statistic } from 'antd';
import { FormatConfig } from 'antd/es/statistic/utils';
import CountUp from 'react-countup';

import * as St from './DashboardItem.styled';

export type DashboardItemProps = {
    icon: JSX.Element;
    title: string;
    data: number;
    ratio: number;
    color?: string;
};

const formatter = (value: number | string, _?: FormatConfig) => {
    if (typeof value === 'number') {
        return <CountUp end={value} separator="," />;
    } else {
        return value;
    }
};

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

            <St.ItemRatio isIncrease={ratio > 0}>
                {ratio > 0 && '+'} {ratio.toFixed(2)}% so với tháng trước
            </St.ItemRatio>
        </St.ItemWrapper>
    );
};

export default DashboardItem;
