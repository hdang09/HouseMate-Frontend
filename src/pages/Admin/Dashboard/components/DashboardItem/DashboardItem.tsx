import { Divider, Flex, Statistic } from 'antd';
import { FormatConfig } from 'antd/es/statistic/utils';
import CountUp from 'react-countup';

import * as St from './DashboardItem.styled';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';

export type DashboardItemProps = {
    icon: JSX.Element;
    title: string;
    data: number;
    ratio: number;
    color?: string;
    isDashboard: boolean;
    days: number;
};

const formatter = (value: number | string, _?: FormatConfig) => {
    if (typeof value === 'number') {
        return <CountUp end={value} separator="," />;
    } else {
        return value;
    }
};

const DashboardItem = ({
    icon,
    title,
    data,
    ratio,
    color,
    isDashboard,
    days,
}: DashboardItemProps) => {
    return (
        <St.ItemWrapper vertical $color={color || ''} $isDashboard={isDashboard}>
            <Flex gap={16}>
                {icon}

                <St.ItemData vertical gap={4} $color={color || ''} $isDashboard={isDashboard}>
                    <Statistic title={title} value={data} formatter={formatter} />
                </St.ItemData>
            </Flex>

            <Divider />

            <St.ItemRatio $isIncrease={ratio > 0}>
                {ratio < 0 ? <BiDownArrowAlt size={20} /> : <BiUpArrowAlt size={20} />}
                {ratio < 0 ? (ratio * -1).toFixed(2) : ratio.toFixed(2)}% so với {days} ngày trước
            </St.ItemRatio>
        </St.ItemWrapper>
    );
};

export default DashboardItem;
