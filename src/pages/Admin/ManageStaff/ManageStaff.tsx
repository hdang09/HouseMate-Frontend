import { Flex, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDocumentTitle } from '@/hooks';
import StaffColumns from './ManageStaff.columns';
import { ManageStaffTable } from './ManageStaff.styled';

const ManageStaff = () => {
    useDocumentTitle('Quản Lý Nhân Viên | HouseMate');

    const [modal, contextHolder] = Modal.useModal();

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
            <Flex gap={20} wrap="wrap">
                <ManageStaffTable
                    columns={StaffColumns(confirm, handleSearchStaff, false)}
                    // dataSource={dummy.map((item) => ({ ...item, key: item.id }))}
                    pagination={{
                        current: 1,
                        pageSize: 5,
                        total: 10,
                    }}
                    scroll={{ x: 800 }}
                />
            </Flex>

            {contextHolder}
        </>
    );
};

export default ManageStaff;
