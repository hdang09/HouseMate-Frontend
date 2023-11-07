import { Image, Button, Input, Space, Flex } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { AiOutlineEye, AiOutlineSearch } from 'react-icons/ai';

import fallbackImage from '@/assets/images/fallback-img.png';
import { ServiceInfoWrapper } from '@/pages/Admin/ServiceList/ServiceList.styled';
import { CustomerText } from './ManageCustomer.styled';
import { CustomerColumnType } from './ManageCustomer.type';

const handleReset = (clearFilters: () => void) => {
    clearFilters();
};

const getColumnSearchProps = (
    handleSearch: (selectedKeys: string[]) => void,
): ColumnType<CustomerColumnType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters, close }) => (
        <Flex vertical style={{ padding: 16 }} gap={16}>
            <Input
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys as string[])}
            />
            <Space size={8}>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys as string[])}
                    icon={<AiOutlineSearch size={20} />}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    Search
                </Button>
                <Button onClick={() => clearFilters && handleReset(clearFilters)}>Reset</Button>
                <Button
                    type="text"
                    onClick={() => {
                        close();
                    }}
                >
                    Close
                </Button>
            </Space>
        </Flex>
    ),
    filterIcon: () => <AiOutlineSearch size={20} />,
    render: (record: CustomerColumnType) => {
        return (
            <ServiceInfoWrapper>
                <Image
                    src={record.customerAvatar}
                    alt={record.customerName}
                    width={55}
                    height={55}
                    fallback={fallbackImage}
                    preview={{
                        mask: <AiOutlineEye />,
                    }}
                    style={{ objectFit: 'cover' }}
                />
                <CustomerText>{record.customerName}</CustomerText>
            </ServiceInfoWrapper>
        );
    },
});

export default getColumnSearchProps;
