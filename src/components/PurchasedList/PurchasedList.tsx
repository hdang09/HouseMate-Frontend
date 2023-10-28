import { List } from 'antd';
import PurchasedItem from '@/components/PurchasedList/PurchasedItem';
import PurchasedListProps from './PurchasedList.type';
import { PurchasedItemStyled } from './PurchasedList.styled';

const PurchasedList = ({ grid, current = 1, pageSize = 4, loading, services, onChange }: PurchasedListProps) => {
    return (
        <List
            loading={loading}
            itemLayout="horizontal"
            grid={grid}
            pagination={{
                current,
                pageSize,
                total: services.length,
                hideOnSinglePage: services.length < pageSize,
                onChange,
            }}
            dataSource={services}
            renderItem={(service) => (
                <PurchasedItemStyled>
                    <PurchasedItem item={service} />
                </PurchasedItemStyled>
            )}
        />
    );
};

export default PurchasedList;
