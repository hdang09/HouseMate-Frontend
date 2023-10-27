import { List } from 'antd';
import PurchasedItem from '@/components/PurchasedList/PurchasedItem';
import PurchasedListProps from './PurchasedList.type';
import { PurchasedItemStyled } from './PurchasedList.styled';

const PurchasedList = ({ grid, pageSize = 4, loading, services }: PurchasedListProps) => {
    return (
        <List
            loading={loading}
            itemLayout="horizontal"
            grid={grid}
            pagination={
                pageSize ? { pageSize, hideOnSinglePage: services.length < pageSize } : false
            }
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
