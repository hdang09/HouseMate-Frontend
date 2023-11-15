import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useEffect, useState } from 'react';

import { Category, OrderBy, SaleStatus, SortBy } from '@/utils/enums';
import { ServiceParams, getServiceAllKind } from '@/utils/serviceAPI';
import { useDocumentTitle } from '@/hooks';

import { DataType, ServiceItemType } from './ServiceList.type';
import ServiceListColumns from './ServiceList.columns';
import { TableStyled } from './ServiceList.styled';
import { useNavigate } from 'react-router-dom';

const ServiceList = () => {
    useDocumentTitle('Danh Sách Dịch Vụ | HouseMate');

    const [data, setData] = useState<DataType>();
    const [reload, setReload] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>();

    const navigate = useNavigate();
    // Params for search, filter, pagination, sort
    const [tableParams, setTableParams] = useState<ServiceParams>({
        page: 1,
        size: 5,
    });

    // Fetch API all kind of services
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await getServiceAllKind(tableParams);
                setData(data);
            } catch (error: any) {
                setData({} as DataType);
            } finally {
                setLoading(false);
            }
        })();
    }, [reload]);

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<ServiceItemType> | SorterResult<ServiceItemType>[],
    ) => {
        const { columnKey, order } = sorter as SorterResult<ServiceItemType>;
        const { category, saleStatus } = filters;

        let categoryValue: Category = Category.ALL;

        if (category) {
            categoryValue =
                category.length === 2 ? Category.ALL : (category[category.length - 1] as Category);
            pagination.current = 1;
        }

        setTableParams({
            ...tableParams,
            page: pagination.current,
            category: categoryValue,
            saleStatus: saleStatus?.toString() as SaleStatus,
            sortBy: order ? (columnKey as SortBy) : SortBy.NONE,
            orderBy: order
                ? order === 'ascend'
                    ? OrderBy.ASC
                    : order === 'descend'
                    ? OrderBy.DESC
                    : OrderBy.NONE
                : OrderBy.NONE,
        });
        setReload(reload + 1);
    };

    const handleSearchService = (selectedKeys: string[]) => {
        const data = selectedKeys.toString().trim();

        setTableParams({
            ...tableParams,
            keyword: data,
            page: 1,
        });
        setReload(reload + 1);
    };

    const handleUpdate = (id: number) => {
        navigate(`/admin/services/${id}`);
    };

    return (
        <>
            <TableStyled
                loading={loading}
                columns={ServiceListColumns(handleSearchService, handleUpdate)}
                dataSource={
                    data?.content &&
                    data?.content.map((item) => ({ ...item, key: item.service.serviceId }))
                }
                pagination={{
                    current: tableParams.page,
                    pageSize: tableParams.size,
                    total: data?.totalElements,
                    hideOnSinglePage: true,
                }}
                scroll={{ x: 1450 }}
                onChange={handleTableChange}
            />
        </>
    );
};

export default ServiceList;
