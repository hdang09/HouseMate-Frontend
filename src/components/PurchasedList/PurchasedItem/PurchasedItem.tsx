import * as Styled from './PurchasedItem.styled';

import { IoIosArrowForward } from 'react-icons/io';
import PurchasedItemProps from './PurchasedItem.type';
import config from '@/config';
import { theme } from '@/themes';

const PurchasedItem = ({
    image,
    serviceName,
    dateStart,
    dateEnd,
    type,
    own,
}: PurchasedItemProps) => {
    // TODO: Fix hard code '772' to orderItemId
    return (
        <Styled.PurchasedItemLink to={`${config.routes.customer.purchased}/772`}>
            <Styled.PurchasedItemWrapper>
                <Styled.PurchasedItemImageWrapper>
                    <Styled.PurchasedItemImage src={image} alt={serviceName} />
                </Styled.PurchasedItemImageWrapper>

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
                        <Styled.PurchasedItemOwnValue>
                            {own.join(', ')}
                        </Styled.PurchasedItemOwnValue>
                    </Styled.PurchasedItemOwn>
                </Styled.PurchasedItemContent>

                <Styled.PurchasedItemButton>
                    <IoIosArrowForward size={40} color={theme.colors.white} />
                </Styled.PurchasedItemButton>
            </Styled.PurchasedItemWrapper>
        </Styled.PurchasedItemLink>
    );
};

export default PurchasedItem;
