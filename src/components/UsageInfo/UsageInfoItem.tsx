import * as Styled from './UsageInfo.styled';

import { MdLocalShipping, MdTimer } from 'react-icons/md';

import { GiHandTruck } from 'react-icons/gi';
import { ServiceCategory } from '@/utils/enums';
import { Typography } from 'antd';
import { theme } from '@/themes';

const { Text } = Typography;

// TODO: Change type to ServiceType
type UsageInfoItemProps = {
    service: any;
    remaining: number;
    total: number;
};

const UsageInfoItem = ({ service, remaining, total }: UsageInfoItemProps) => {
    // Icon for service
    let icon = <MdTimer color={theme.colors.primary} />; // Hourly service
    if (service.groupType === ServiceCategory.RETURN_SERVICE) {
        icon = <GiHandTruck color={theme.colors.secondary} />;
    } else if (service.groupType === ServiceCategory.DELIVERY_SERVICE) {
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
