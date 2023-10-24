import { Image, Button, Input, Space, Flex } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { AiOutlineEye, AiOutlineSearch } from 'react-icons/ai';

import fallbackImage from '@/assets/images/fallback-img.png';
import { ServiceDetailType } from '@/pages/ServiceDetail/ServiceDetail.type';

import { ServiceInfoWrapper, ServiceText } from './ServiceList.styled';

const handleReset = (clearFilters: () => void) => {
    clearFilters();
};

const getColumnSearchProps = (
    handleSearch: (selectedKeys: string[]) => void,
): ColumnType<ServiceDetailType> => ({
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
    render: (record: ServiceDetailType) => (
        <ServiceInfoWrapper>
            <Image.PreviewGroup items={record.images} fallback={fallbackImage}>
                <Image
                    src={record.service.mainImg}
                    alt={record.service.titleName}
                    width={55}
                    height={55}
                    fallback={fallbackImage}
                    preview={{
                        mask: <AiOutlineEye />,
                    }}
                    style={{ objectFit: 'cover' }}
                />
            </Image.PreviewGroup>
            <ServiceText>{record.service.titleName}</ServiceText>
        </ServiceInfoWrapper>
    ),
});

export default getColumnSearchProps;
