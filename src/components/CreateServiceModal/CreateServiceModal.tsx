// import React from 'react'
import { DatePicker, DatePickerProps, Dropdown, MenuProps, Row, Space } from 'antd';
import * as Styled from './CreateServiceModal.styled';
import { DownOutlined } from '@ant-design/icons';
import { EventType } from 'firebase/database';
import { useState } from 'react';

type Props = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
};

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};

const fields = [
    {
        id: 1,
        name: 'Date',
        input: <DatePicker onChange={onChange} />,
    },
];

const items: MenuProps['items'] = [
    {
        key: '0',
        label: 'Choose Service',
    },
    {
        key: '1',
        label: 'Cleaning House',
    },
    {
        key: '2',
        label: 'Laundry',
    },
    {
        key: '3',
        label: 'Water delivery',
    },
    {
        key: '4',
        label: 'Rice delivery',
    },
];

const CreateServiceModal = ({ isModalOpen, handleOk, handleCancel }: Props) => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['0']);
    const [item, setItem] = useState<any>();

    const handleSelect: MenuProps['onClick'] = (item) => {
        // This callback is triggered when an item is selected in the dropdown
        // console.log('Selected Keys:', selectedKeys);
        // setSelectedKeys(selectedKeys); // Update the selected keys in the state
        const index = +item?.key[0];
        console.log(items[index]);

        setItem(items[+item?.key[0]]);
    };
    return (
        <Styled.CreateServiceModal
            title="Set a new schedule"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Row>
                <Styled.ModalTitle>Service</Styled.ModalTitle>
                <Dropdown
                    menu={{
                        items,
                        selectable: true,
                        defaultSelectedKeys: selectedKeys,
                        onSelect: handleSelect,
                    }}
                >
                    <a>
                        <Space>
                            {selectedKeys} - {item}
                        </Space>
                    </a>
                </Dropdown>
            </Row>
            {/* 
            {fields.map((field, index) => {
                return field.input;
            })} */}
        </Styled.CreateServiceModal>
    );
};

export default CreateServiceModal;
