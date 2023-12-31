import * as Styled from './Calendar.styled';

import { Button, Space } from 'antd';
import { ModalEnum, Role } from '@/utils/enums';

import { PlusOutlined } from '@ant-design/icons';
import STATUS from './Calendar.status';
import ServiceModal from '@/components/ServiceModal';
import { useAuth } from '@/hooks';
import { useMediaQuery } from 'styled-breakpoints/use-media-query';
import { useState } from 'react';
import { useTheme } from 'styled-components';

type StatusPanelProps = {
    direction: 'horizontal' | 'vertical';
    align: 'start' | 'end' | 'center' | 'baseline';
};

const StatusPanel = ({ direction, align }: StatusPanelProps) => {
    const { user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddSchedule = () => {
        setIsModalOpen(true);
    };

    const isDownMd = useMediaQuery(useTheme()?.breakpoints.down('lg'));

    return (
        <Space size={isDownMd ? 20 : 26} direction={direction} align={align}>
            {user?.role === Role.CUSTOMER && (
                <Button type="primary" onClick={handleAddSchedule} icon={<PlusOutlined />}>
                    Tạo lịch mới
                </Button>
            )}

            {STATUS.map((item) => (
                <Styled.StatusItem key={item.value} $color={item.color}>
                    {item.label}
                </Styled.StatusItem>
            ))}

            <ServiceModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                title="Set a new schedule"
                variant={ModalEnum.CREATE}
            />
        </Space>
    );
};

export default StatusPanel;
