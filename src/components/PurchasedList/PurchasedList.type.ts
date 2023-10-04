import PurchasedItemProps from '@/components/PurchasedItem/PurchasedItem.type';

type PurchasedListProps = {
    grid?: object;
    pageSize?: number;
    services: PurchasedItemProps[];
};

export default PurchasedListProps;
