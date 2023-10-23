import * as Styled from './UsageInfo.styled';

import { MdLocalLaundryService, MdLocalShipping, MdTimer } from 'react-icons/md';

import { ServiceCategory } from '@/utils/enums';
import { Typography } from 'antd';
import { theme } from '@/themes';

const { Text } = Typography;

// TODO: Fix type 'any'
const UsageInfoItem = ({ service }: { service: any }) => {
    // Icon for service
    let icon = <MdTimer color={theme.colors.primary} />; // Hourly service
    if (service.groupType === ServiceCategory.RETURN_SERVICE) {
        icon = <MdLocalLaundryService color={theme.colors.secondary} />;
    } else if (service.groupType === ServiceCategory.DELIVERY_SERVICE) {
        icon = <MdLocalShipping color={theme.colors.yellow} />;
    }

    return (
        <Styled.UsageItem key={service.serviceId}>
            <Styled.UsageIcon>{icon}</Styled.UsageIcon>

            <Styled.UsageServiceName>{service.titleName}</Styled.UsageServiceName>

            <Styled.UsageProgress
                percent={(service.quantityRemaining / service.quantityPurchased) * 100}
            />

            <Styled.UsageCount>
                <Styled.UsageRemaining>{service.quantityRemaining}</Styled.UsageRemaining>

                <Text>{service.unitOfMeasure}</Text>
            </Styled.UsageCount>
        </Styled.UsageItem>
    );
};

export default UsageInfoItem;
