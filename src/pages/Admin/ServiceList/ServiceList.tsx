import { Modal, Table, TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { ServiceDetailType } from '@/pages/ServiceDetail/ServiceDetail.type';

import { TableParams } from './ServiceList.type';
import ServiceListColumns from './ServiceList.columns';
import { dummy } from './ServiceList.dummy';

const ServiceList = () => {
    const [modal, contextHolder] = Modal.useModal();
    const [services, setServices] = useState<ServiceDetailType[]>([]);
    const [loading, setLoading] = useState<boolean>();

    // Params for search, filter, pagination, sort
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 9,
        },
    });

    useEffect(() => {
        // TODO: Waiting API from server
        const data = dummy.map((item: ServiceDetailType) => ({
            ...item,
            key: item.service.serviceId,
        }));

        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                total: dummy.length,
            },
        });

        setServices(data);
        setLoading(false);
    }, []);

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
    ) => {
        console.log(filters);

        setTableParams({
            ...tableParams,
            pagination,
        });
    };

    console.log(tableParams);

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
            ...selectedKeys,
        });
    };

    const handleDeleteService = () => {
        console.log('Deleted!');
    };

    return (
        <>
            <Table
                loading={loading}
                columns={ServiceListColumns(confirm, handleSearchService)}
                dataSource={services}
                pagination={tableParams.pagination}
                scroll={{ x: 1450 }}
                onChange={handleTableChange}
            />

            {contextHolder}
        </>
    );
};

export default ServiceList;
