import * as Styled from './Schedule.styled';

import { Button, Space } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import STATUS from './Schedule.status';
import { useMediaQuery } from 'styled-breakpoints/use-media-query';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import ServiceModal from '../CreateServiceModal/ServiceModal';

type StatusPanelProps = {
    direction: 'horizontal' | 'vertical';
    align: 'start' | 'end' | 'center' | 'baseline';
};

const StatusPanel = ({ direction, align }: StatusPanelProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddSchedule = () => {
        setIsModalOpen(true);
    };

    const isDownMd = useMediaQuery(useTheme()?.breakpoints.down('lg'));

    return (
        <Space size={isDownMd ? 20 : 26} direction={direction} align={align}>
            <Button type="primary" onClick={handleAddSchedule} icon={<PlusOutlined />}>
                New schedule
            </Button>

            {STATUS.map((item) => (
                <Styled.StatusItem key={item.name} $color={item.color}>
                    {item.name}
                </Styled.StatusItem>
            ))}

            <ServiceModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                title="Set a new schedule"
                variant="Create"
            />
        </Space>
    );
};

export default StatusPanel;
