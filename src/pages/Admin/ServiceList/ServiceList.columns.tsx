import type { ColumnsType } from 'antd/es/table';
import { BsFilter } from 'react-icons/bs';

import { Category, CategoryLabel, SaleStatus, SaleStatusLabel, SortBy } from '@/utils/enums';

import getColumnSearchProps from './ServiceList.search';
import { ServiceActions, ServiceText, TableBadge } from './ServiceList.styled';
import { ServiceItemType } from './ServiceList.type';

const ServiceListColumns = (
    handleSearch: (selectedKeys: string[]) => void,
    handleUpdate: (id: number) => void,
) => {
    const columns: ColumnsType<ServiceItemType> = [
        {
            key: SortBy.NAME,
            title: 'Dịch vụ',
            fixed: 'left',
            width: 300,
            sorter: true,
            ...getColumnSearchProps(handleSearch),
        },
        {
            key: 'category',
            title: 'Phân loại',
            filters: [
                { text: CategoryLabel.SINGLE, value: Category.SINGLE_SERVICE_UPPER },
                { text: CategoryLabel.PACKAGE, value: Category.PACKAGE_SERVICE_UPPER },
            ],
            filterIcon: () => <BsFilter size={20} />,
            render: (record: ServiceItemType) => (
                <ServiceText>
                    {record.service.package ? CategoryLabel.PACKAGE : CategoryLabel.SINGLE}
                </ServiceText>
            ),
        },
        {
            key: 'saleStatus',
            title: 'Tình trạng',
            width: 170,
            filterMultiple: false,
            filters: [
                { text: SaleStatusLabel.AVAILABLE, value: SaleStatus.AVAILABLE },
                { text: SaleStatusLabel.ONSALE, value: SaleStatus.ONSALE },
                { text: SaleStatusLabel.DISCONTINUED, value: SaleStatus.DISCONTINUED },
            ],
            filterIcon: () => <BsFilter size={20} />,
            render: (record: ServiceItemType) => {
                const { saleStatus } = record.service;
                const status =
                    saleStatus === SaleStatus.AVAILABLE
                        ? 'processing'
                        : saleStatus === SaleStatus.ONSALE
                        ? 'warning'
                        : 'default';

                const text =
                    saleStatus === SaleStatus.AVAILABLE
                        ? SaleStatusLabel.AVAILABLE
                        : saleStatus === SaleStatus.ONSALE
                        ? SaleStatusLabel.ONSALE
                        : SaleStatusLabel.DISCONTINUED;

                return <TableBadge status={status} text={<ServiceText>{text}</ServiceText>} />;
            },
        },
        {
            key: SortBy.PRICE,
            sorter: true,
            sortDirections: ['descend', 'ascend'],
            title: 'Giá 1 tháng',
            render: (record: ServiceItemType) => (
                <ServiceText>{record.priceList[0]?.finalPrice.toLocaleString() || 0}đ</ServiceText>
            ),
        },
        {
            title: 'Giá 3 tháng',
            render: (record: ServiceItemType) => (
                <ServiceText>{record.priceList[1]?.finalPrice.toLocaleString() || 0}đ</ServiceText>
            ),
        },
        {
            title: 'Giá 6 tháng',
            render: (record: ServiceItemType) => (
                <ServiceText>{record.priceList[2]?.finalPrice.toLocaleString() || 0}đ</ServiceText>
            ),
        },
        {
            title: 'Giá 9 tháng',
            render: (record: ServiceItemType) => (
                <ServiceText>{record.priceList[3]?.finalPrice.toLocaleString() || 0}đ</ServiceText>
            ),
        },
        {
            title: 'Giá 12 tháng',
            render: (record: ServiceItemType) => (
                <ServiceText>{record.priceList[4]?.finalPrice.toLocaleString() || 0}đ</ServiceText>
            ),
        },
        {
            title: 'Thao tác',
            fixed: 'right',
            render: (record: ServiceItemType) => (
                <ServiceActions>
                    <ServiceText onClick={() => handleUpdate(record.service.serviceId)}>
                        Chỉnh sửa
                    </ServiceText>
                </ServiceActions>
            ),
        },
    ];

    return columns;
};

export default ServiceListColumns;
