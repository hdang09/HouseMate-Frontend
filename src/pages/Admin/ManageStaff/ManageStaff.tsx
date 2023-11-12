import { Flex, Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

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
    const [staff, setStaff] = useState<StaffColumnType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const { data } = await getStaffTable();

                setStaff(data);
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

    const handleChangePage = (page: number) => {
        setLoading(true);

        setTimeout(() => {
            setCurrentPage(page);
            setLoading(false);
        }, 500);
    };

    const handleDeleteStaff = async () => {
        console.log('Deleted!');
    };

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

    const handleSearchStaff = (selectedKeys: string[]) => {
        const data = selectedKeys.toString().trim();
        console.log(data);
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
                        total: staff.length,
                        hideOnSinglePage: true,
                        onChange: handleChangePage,
                    }}
                    scroll={{ x: 800 }}
                />
            </Flex>

            {contextHolderModal}
        </>
    );
};

export default ManageStaff;
