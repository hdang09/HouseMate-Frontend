import PurchasedItemProps from '@/components/PurchasedList/PurchasedItem/PurchasedItem.type';

type PurchasedListProps = {
    grid?: object;
    pageSize?: number;
    services: PurchasedItemProps[];
};

export default PurchasedListProps;
