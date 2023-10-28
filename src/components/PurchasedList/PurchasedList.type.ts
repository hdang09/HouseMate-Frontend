import PurchasedType from '@/pages/Customer/Purchased/Purchased.type';

type PurchasedListProps = {
    grid?: object;
    current?: number;
    pageSize?: number;
    loading?: boolean;
    services: PurchasedType[];
    onChange?: ((page: number, pageSize: number) => void) | undefined;
};

export default PurchasedListProps;
