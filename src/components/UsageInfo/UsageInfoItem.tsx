import * as Styled from './UsageInfo.styled';

import { MdLocalShipping, MdTimer } from 'react-icons/md';

import { GiHandTruck } from 'react-icons/gi';
import { GroupType } from '@/utils/enums';
import { ServiceType } from '@/components/ServiceList/ServiceItem';
import { Typography } from 'antd';
import { theme } from '@/themes';

const { Text } = Typography;

type UsageInfoItemProps = {
    service: ServiceType;
    remaining: number;
    total: number;
};

const UsageInfoItem = ({ service, remaining, total }: UsageInfoItemProps) => {
    // Icon for service
    let icon = <MdTimer color={theme.colors.primary} />; // Hourly service

    if (service.groupType === GroupType.RETURN_SERVICE) {
        icon = <GiHandTruck color={theme.colors.secondary} />;
    } else if (service.groupType === GroupType.DELIVERY_SERVICE) {
        icon = <MdLocalShipping color={theme.colors.yellow} />;
    }

    // Stroke color
    const percent = Math.floor((remaining / total) * 100);
    const strokeColor =
        percent === 100
            ? theme.colors.done
            : percent < 5
            ? theme.colors.error
            : percent < 30
            ? theme.colors.warning
            : theme.colors.secondary;

    return (
        <Styled.UsageItem key={service.serviceId}>
            <Styled.UsageIcon>{icon}</Styled.UsageIcon>

            <Styled.UsageServiceName>{service.titleName}</Styled.UsageServiceName>

            <Styled.UsageProgress percent={percent} showInfo={false} strokeColor={strokeColor} />

            <Styled.UsageCount>
                <Styled.PrimaryText>{remaining}</Styled.PrimaryText>
                <Text>/{total} </Text>
                <Text>{service.unitOfMeasure}</Text>
            </Styled.UsageCount>
        </Styled.UsageItem>
    );
};

export default UsageInfoItem;
