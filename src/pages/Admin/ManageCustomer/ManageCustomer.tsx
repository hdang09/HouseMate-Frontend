import { Flex, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// import DashboardItem from '@/pages/Admin/Dashboard/components/DashboardItem';
import CustomerColumns from './ManageCustomer.columns';
import { ManageCustomerTable } from './ManageCustomer.styled';
import { dummy } from './ManageCustomer.dummy';

const ManageCustomer = () => {
    const [modal, contextHolder] = Modal.useModal();

    const handleDeleteCustomer = async () => {
        console.log('Deleted!');
    };

    const confirm = () => {
        modal.confirm({
            centered: true,
            title: 'Bạn có muốn cấm tài khoản người dùng này?',
            icon: <ExclamationCircleOutlined />,
            content:
                'Tài khoản người dùng sau khi bị xóa sẽ bị ẩn khỏi hệ thống và ngưng các hoạt động.',
            okText: 'Xác nhận',
            onOk: handleDeleteCustomer,
            cancelText: 'Quay lại',
        });
    };

    const handleSearchCustomer = (selectedKeys: string[]) => {
        const data = selectedKeys.toString().trim();
        console.log(data);
    };

    return (
        <>
            <Flex gap={20} wrap="wrap">
                <Flex vertical gap={40} style={{ width: '310px' }}>
                    Dashboard Item
                    {/* <DashboardItem
                        icon={<AiOutlineTeam size={55} />}
                        title="Tổng số nhân viên"
                        data={112893}
                        ratio={3.4}
                        color={theme.colors.primary}
                    />

                    <DashboardItem
                        icon={<AiOutlineCheckSquare size={55} />}
                        title="Tổng số dịch vụ thực hiện"
                        data={112893}
                        ratio={3.4}
                        color={theme.colors.success}
                    /> */}
                </Flex>

                <ManageCustomerTable
                    columns={CustomerColumns(confirm, handleSearchCustomer)}
                    dataSource={dummy.map((item) => ({ ...item, key: item.id }))}
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

export default ManageCustomer;
