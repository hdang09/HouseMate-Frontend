import { useEffect, useState } from 'react';

import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import useWebSocket from 'react-use-websocket';

interface Staff {
    userId: number;
    fullName: string;
    phoneNumber: number;
    emailAddress: string;
    emailValidationStatus: boolean;
    avatar: string;
    role: string;
}

const columns: ColumnsType<Staff> = [
    {
        title: 'User ID',
        dataIndex: 'userId',
        key: 'userId',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Full name',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Phone number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Email address',
        dataIndex: 'emailAddress',
        key: 'emailAddress',
    },
    {
        title: 'Email validation status',
        dataIndex: 'emailValidationStatus',
        key: 'emailValidationStatus',
        // render: (_, { emailValidationStatus }) => (
        //     <>
        //         {emailValidationStatus.map((emailValidationStatus) => {
        //             let color = emailValidationStatus.length > 5 ? 'geekblue' : 'green';
        //             if (tag === 'loser') {
        //                 color = 'volcano';
        //             }
        //             return (
        //                 <Tag color={color} key={tag}>
        //                     {tag.toUpperCase()}
        //                 </Tag>
        //             );
        //         })}
        //     </>
        // ),
    },
    {
        title: 'Avatar',
        key: 'avatar',
        dataIndex: 'avatar',
    },
    {
        title: 'Role',
        key: 'role',
        dataIndex: 'role',
    },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //         <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
];

const ManageStaff = () => {
    const { lastMessage } = useWebSocket('wss://housemateb.thanhf.dev/auth/all');
    const [staffs, setStaffs] = useState<Staff[]>();

    // useEffect(() => {
    //     get('/account/all').then((res) => setStaffs(res.data));
    // }, []);

    // Update the state with the new comment when a message is received
    useEffect(() => {
        if (lastMessage === null) return;

        // Parse the message data as JSON
        const data = JSON.parse(lastMessage.data);
        console.log(data);

        // Update the state with the new comment
        setStaffs((staffs) => [...staffs!, data]);
    }, [lastMessage]);

    return (
        <>
            <h1>Manage Staff</h1>
            <Table columns={columns} dataSource={staffs} />
        </>
    );
};

export default ManageStaff;
