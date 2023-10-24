import type { ColumnsType } from 'antd/es/table';
import { BsFilter } from 'react-icons/bs';

import { ServiceDetailType } from '@/pages/ServiceDetail/ServiceDetail.type';
import { Category, CategoryLabel, SaleStatus, SaleStatusLabel } from '@/utils/enums';

import getColumnSearchProps from './ServiceList.search';
import { ServiceActions, ServiceText, TableBadge } from './ServiceList.styled';

const ServiceListColumns = (
    confirm: () => void,
    handleSearch: (selectedKeys: string[]) => void,
) => {
    const columns: ColumnsType<ServiceDetailType> = [
        {
            title: 'Dịch vụ',
            fixed: 'left',
            width: 300,
            ...getColumnSearchProps(handleSearch),
        },
        {
            title: 'Phân loại',
            filters: [
                { text: CategoryLabel.SINGLE, value: Category.SINGLE_SERVICE_UPPER },
                { text: CategoryLabel.PACKAGE, value: Category.PACKAGE_SERVICE_UPPER },
            ],
            filterIcon: () => <BsFilter size={20} />,
            render: (record: ServiceDetailType) => (
                <ServiceText>
                    {record.service.package ? CategoryLabel.PACKAGE : CategoryLabel.SINGLE}
                </ServiceText>
            ),
        },
        {
            title: 'Tình trạng',
            width: 170,
            filters: [
                { text: SaleStatusLabel.AVAILABLE, value: SaleStatus.AVAILABLE },
                { text: SaleStatusLabel.DISCONTINUED, value: SaleStatus.DISCONTINUED },
            ],
            filterIcon: () => <BsFilter size={20} />,
            render: (record: ServiceDetailType) => (
                <TableBadge
                    status={
                        record.service.saleStatus === SaleStatus.DISCONTINUED
                            ? 'default'
                            : 'processing'
                    }
                    text={
                        <ServiceText>
                            {record.service.saleStatus === SaleStatus.DISCONTINUED
                                ? SaleStatusLabel.DISCONTINUED
                                : SaleStatusLabel.AVAILABLE}
                        </ServiceText>
                    }
                />
            ),
        },
        {
            title: 'Giá 1 tháng',
            render: (record: ServiceDetailType) => (
                <ServiceText>{record.priceList[0]?.finalPrice.toLocaleString() || 0}đ</ServiceText>
            ),
        },
        {
            title: 'Giá 3 tháng',
            render: (record: ServiceDetailType) => (
                <ServiceText>{record.priceList[1]?.finalPrice.toLocaleString() || 0}đ</ServiceText>
            ),
        },
        {
            title: 'Giá 6 tháng',
            render: (record: ServiceDetailType) => (
                <ServiceText>{record.priceList[2]?.finalPrice.toLocaleString() || 0}đ</ServiceText>
            ),
        },
        {
            title: 'Giá 9 tháng',
            render: (record: ServiceDetailType) => (
                <ServiceText>{record.priceList[3]?.finalPrice.toLocaleString() || 0}đ</ServiceText>
            ),
        },
        {
            title: 'Giá 12 tháng',
            render: (record: ServiceDetailType) => (
                <ServiceText>{record.priceList[4]?.finalPrice.toLocaleString() || 0}đ</ServiceText>
            ),
        },
        {
            title: 'Thao tác',
            fixed: 'right',
            render: () => (
                <ServiceActions>
                    <ServiceText>Chỉnh sửa</ServiceText>
                    <ServiceText onClick={confirm}>Xóa</ServiceText>
                </ServiceActions>
            ),
        },
    ];

    return columns;
};

export default ServiceListColumns;
