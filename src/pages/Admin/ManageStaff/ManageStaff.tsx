import { Flex, Modal, TablePaginationConfig, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import { useEffect, useRef, useState } from 'react';

import { useDocumentTitle } from '@/hooks';
import { getStaffTable } from '@/utils/dashboardAPI';

import StaffColumns from './ManageStaff.columns';
import { StaffColumnType } from './ManageStaff.type';
import { ManageStaffTable } from './ManageStaff.styled';

const ManageStaff = () => {
    useDocumentTitle('Quản Lý Nhân Viên | HouseMate');

    // Show toast
    const [api, contextHolderNotification] = notification.useNotification({
        top: 100,
    });
    const [modal, contextHolderModal] = Modal.useModal();
    const staffStore = useRef<StaffColumnType[]>([]);
    const [staff, setStaff] = useState<StaffColumnType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const { data } = await getStaffTable();

                setStaff(data);
                staffStore.current = data;
            } catch (error: any) {
                api.error({
                    message: 'Lỗi',
                    description: error.response ? error.response.data : error.message,
                });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn có muốn xóa hồ sơ nhân viên này?',
            icon: <ExclamationCircleOutlined />,
            content:
                'Hồ sơ nhân viên sau khi bị xóa sẽ bị ẩn khỏi hệ thống và ngưng các hoạt động.',
            okText: 'Quay lại',
            onCancel: handleDeleteStaff,
            cancelText: 'Xác nhận',
        });
    };

    const handleTableChange = (
        pagination: TablePaginationConfig,
        _filters: Record<string, FilterValue | null>,
        _sorter: SorterResult<StaffColumnType> | SorterResult<StaffColumnType>[],
        extra: TableCurrentDataSource<StaffColumnType>,
    ) => {
        setLoading(true);

        const { current } = pagination;

        setTimeout(() => {
            setCurrentPage(current || 1);
            setTotalElements(extra.currentDataSource.length);
            setLoading(false);
        }, 500);
    };

    const handleSearchStaff = (selectedKeys: string[]) => {
        setLoading(true);

        setTimeout(() => {
            const data = selectedKeys.toString().trim().toLowerCase();
            const filteredData = staffStore.current.filter((item) =>
                item.staffName.toLowerCase().includes(data),
            );

            setStaff(filteredData);
            setCurrentPage(1);
            setTotalElements(filteredData.length);
            setLoading(false);
        }, 500);
    };

    const handleDeleteStaff = async () => {
        console.log('Deleted!');
    };

    return (
        <>
            {contextHolderNotification}

            <Flex gap={20} wrap="wrap">
                <ManageStaffTable
                    loading={loading}
                    columns={StaffColumns(confirm, handleSearchStaff, false)}
                    dataSource={staff.map((item) => ({ ...item, key: item.id }))}
                    pagination={{
                        current: currentPage,
                        pageSize: 5,
                        total: totalElements,
                        hideOnSinglePage: true,
                    }}
                    scroll={{ x: 800 }}
                    onChange={handleTableChange}
                />
            </Flex>

            {contextHolderModal}
        </>
    );
};

export default ManageStaff;
