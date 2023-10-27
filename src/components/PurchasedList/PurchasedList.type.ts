import PurchasedType from '@/pages/Customer/Purchased/Purchased.type';

type PurchasedListProps = {
    grid?: object;
    pageSize?: number;
    loading?: boolean;
    services: PurchasedType[];
};

export default PurchasedListProps;
