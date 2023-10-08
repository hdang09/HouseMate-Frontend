import { List } from 'antd';
import PurchasedItem from '@/components/PurchasedList/PurchasedItem';
import PurchasedListProps from './PurchasedList.type';
import { PurchasedItemStyled } from './PurchasedList.styled';

const PurchasedList = ({ grid, pageSize = 4, services }: PurchasedListProps) => {
    return (
        <List
            itemLayout="horizontal"
            grid={grid}
            pagination={pageSize ? { pageSize } : false}
            dataSource={services}
            renderItem={(service) => (
                <PurchasedItemStyled>
                    <PurchasedItem
                        image={service.image}
                        serviceName={service.serviceName}
                        dateStart={service.dateStart}
                        dateEnd={service.dateEnd}
                        type={service.type}
                        own={service.own}
                    />
                </PurchasedItemStyled>
            )}
        />
    );
};

export default PurchasedList;