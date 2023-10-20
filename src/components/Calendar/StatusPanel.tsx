import * as Styled from './Schedule.styled';

import { Button, Space } from 'antd';

import CreateServiceModal from '@/components/CreateServiceModal';
import { PlusOutlined } from '@ant-design/icons';
import STATUS from './Schedule.status';
import { useState } from 'react';

type StatusPanelProps = {
    direction: 'horizontal' | 'vertical';
    align: 'start' | 'end' | 'center' | 'baseline';
};

const StatusPanel = ({ direction, align }: StatusPanelProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddSchedule = () => {
        setIsModalOpen(true);
    };

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

            <CreateServiceModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                title="Set a new schedule"
                variant="Create"
            />
        </Space>
    );
};

export default StatusPanel;
