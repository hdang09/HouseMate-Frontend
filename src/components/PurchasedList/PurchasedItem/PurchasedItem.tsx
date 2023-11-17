import { IoIosArrowForward } from 'react-icons/io';
import dayjs from 'dayjs';

import fallbackImage from '@/assets/images/fallback-img.png';
import config from '@/config';
import PurchasedType from '@/pages/Customer/Purchased/Purchased.type';
import { CategoryLabel } from '@/utils/enums';
import { theme } from '@/themes';

import * as Styled from './PurchasedItem.styled';

const PurchasedItem = ({ item }: { item: PurchasedType }) => {
    console.log(item.service.images);

    return (
        <Styled.PurchasedItemLink to={`${config.routes.customer.purchased}/${item.orderItemId}`}>
            <Styled.PurchasedItemWrapper>
                <Styled.PurchasedItemImageWrapper>
                    <Styled.PurchasedItemImage
                        src={
                            item.service.images && item.service.images[0]
                                ? item.service.images[0].imageUrl
                                : ''
                        }
                        alt={item.service.titleName}
                        preview={false}
                        fallback={fallbackImage}
                    />
                </Styled.PurchasedItemImageWrapper>

                <Styled.PurchasedItemContent>
                    <Styled.PurchasedItemName>{item.service.titleName}</Styled.PurchasedItemName>

                    <Styled.PurchasedItemDate>
                        {dayjs(item.startDate).format('DD/MM/YYYY') + ' - '}
                        {dayjs(item.endDate).format('DD/MM/YYYY')}
                    </Styled.PurchasedItemDate>

                    <Styled.PurchasedItemType>
                        <Styled.PurchasedItemTypeKey>Loại:</Styled.PurchasedItemTypeKey>
                        <Styled.PurchasedItemTypeValue>
                            {item.service.package ? CategoryLabel.PACKAGE : CategoryLabel.SINGLE}
                        </Styled.PurchasedItemTypeValue>
                    </Styled.PurchasedItemType>

                    <Styled.PurchasedItemOwn>
                        <Styled.PurchasedItemOwnKey>Dịch vụ bao gồm: </Styled.PurchasedItemOwnKey>
                        <Styled.PurchasedItemOwnValue>
                            {item.singleServiceName.join(', ')}
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
