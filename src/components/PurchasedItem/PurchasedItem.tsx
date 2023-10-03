import { Image } from 'antd';
import { IoIosArrowForward } from 'react-icons/io';

import config from '@/config';
import { theme } from '@/themes';

import PurchasedItemProps from './PurchasedItem.type';
import * as Styled from './PurchasedItem.styled';

const PurchasedItem = ({
    image,
    serviceName,
    dateStart,
    dateEnd,
    type,
    own,
}: PurchasedItemProps) => {
    return (
        <Styled.PurchasedItemWrapper>
            <Image width={300} height={200} src={image} alt={serviceName} />

            <Styled.PurchasedItemContent>
                <Styled.PurchasedItemName>{serviceName}</Styled.PurchasedItemName>

                <Styled.PurchasedItemDate>
                    {dateStart} - {dateEnd}
                </Styled.PurchasedItemDate>

                <Styled.PurchasedItemType>
                    <Styled.PurchasedItemTypeKey>Type:</Styled.PurchasedItemTypeKey>
                    <Styled.PurchasedItemTypeValue>{type}</Styled.PurchasedItemTypeValue>
                </Styled.PurchasedItemType>

                <Styled.PurchasedItemOwn>
                    <Styled.PurchasedItemOwnKey>You currently own:</Styled.PurchasedItemOwnKey>
                    <Styled.PurchasedItemOwnValue>{own.join(', ')}</Styled.PurchasedItemOwnValue>
                </Styled.PurchasedItemOwn>
            </Styled.PurchasedItemContent>

            <Styled.PurchasedItemButton to={config.routes.public.home}>
                <IoIosArrowForward size={40} color={theme.colors.white} />
            </Styled.PurchasedItemButton>
        </Styled.PurchasedItemWrapper>
    );
};

export default PurchasedItem;
