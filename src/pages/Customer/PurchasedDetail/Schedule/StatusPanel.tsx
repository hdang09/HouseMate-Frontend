import * as Styled from './Schedule.styled';

import { Button, Space } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import STATUS from './Schedule.status';

type StatusPanelProps = {
    direction: 'horizontal' | 'vertical';
    align: 'start' | 'end' | 'center' | 'baseline';
};

const StatusPanel = ({ direction, align }: StatusPanelProps) => {
    const handleAddSchedule = () => {};

    return (
        <Space size={35} direction={direction} align={align}>
            <Button type="primary" onClick={handleAddSchedule} icon={<PlusOutlined />}>
                New schedule
            </Button>

            {STATUS.map((item) => (
                <Styled.StatusItem key={item.name} $color={item.color}>
                    {item.name}
                </Styled.StatusItem>
            ))}
        </Space>
    );
};

export default StatusPanel;
