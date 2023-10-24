import { Modal, Table, TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { DataType } from './ServiceList.type';
import ServiceListColumns from './ServiceList.columns';
import { ServiceParams, getServiceAllKind } from '@/utils/serviceAPI';

const ServiceList = () => {
    const [modal, contextHolder] = Modal.useModal();
    const [data, setData] = useState<DataType>();
    const [categoryList, setCategoryList] = useState<string[]>([]);
    const [statusList, setStatusList] = useState<string[]>([]);
    const [reload, setReload] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>();

    // Params for search, filter, pagination, sort
    const [tableParams, setTableParams] = useState<ServiceParams>({
        page: 1,
        size: 9,
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
    ) => {
        setCategoryList(filters[1] as string[]);
        setStatusList(filters[2] as string[]);
        setTableParams({
            ...tableParams,
            page: pagination.current,
        });
        setReload(reload + 1);
    };

    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn có muốn xóa dịch vụ này không?',
            icon: <ExclamationCircleOutlined />,
            content: 'Dịch vụ sau khi bị xóa sẽ ẩn khỏi cửa hàng và ngưng bán.',
            okText: 'Xóa',
            onOk: handleDeleteService,
            cancelText: 'Quay lại',
        });
    };

    const handleSearchService = (selectedKeys: string[]) => {
        setTableParams({
            ...tableParams,
            keyword: Array(selectedKeys).toString(),
        });
        setReload(reload + 1);
    };

    const handleDeleteService = () => {
        console.log('Deleted!');
    };

    return (
        <>
            <Table
                loading={loading}
                columns={ServiceListColumns(confirm, handleSearchService)}
                dataSource={
                    data?.content &&
                    data?.content.map((item) => ({ ...item, key: item.service.serviceId }))
                }
                pagination={{
                    current: tableParams.page,
                    pageSize: tableParams.size,
                    total: data?.totalElements,
                }}
                scroll={{ x: 1450 }}
                onChange={handleTableChange}
            />

            {contextHolder}
        </>
    );
};

export default ServiceList;
