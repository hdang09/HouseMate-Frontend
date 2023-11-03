import { Divider, Flex, Typography } from 'antd';

import * as St from './DashboardItem.styled';

const { Paragraph, Text } = Typography;

export type DashboardItemProps = {
    icon: JSX.Element;
    title: string;
    data: number;
    ratio: number;
    color?: string;
};

const DashboardItem = ({ icon, title, data, ratio, color }: DashboardItemProps) => {
    return (
        <St.ItemWrapper vertical $color={color || ''}>
            <Flex gap={20}>
                {icon}

                <St.ItemData vertical gap={4} $color={color || ''}>
                    <Text>{title}</Text>
                    <Paragraph>{data.toLocaleString()}</Paragraph>
                </St.ItemData>
            </Flex>

            <Divider />

            <St.ItemRatio>+ {ratio}% so với tháng trước</St.ItemRatio>
        </St.ItemWrapper>
    );
};

export default DashboardItem;
