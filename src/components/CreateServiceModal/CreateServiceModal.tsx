// import React from 'react'
import { DatePicker, Row, Select } from 'antd';
import * as Styled from './CreateServiceModal.styled';

type Props = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
};

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const fields = [
    {
        id: 1,
        name: 'Date',
        input: <DatePicker />,
    },
];

const CreateServiceModal = ({ isModalOpen, handleOk, handleCancel }: Props) => {
    return (
        <Styled.CreateServiceModal
            title="Set a new schedule"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Row>
                <Styled.ModalTitle>Service</Styled.ModalTitle>
                <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: 'Cleaning House', label: 'Cleaning House' },
                        { value: 'Laundry', label: 'Laundry' },
                        { value: 'Water delivery', label: 'Water delivery' },
                        { value: 'Rice delivery', label: 'Rice delivery' },
                    ]}
                />
            </Row>
            {/* 
            {fields.map((field, index) => {
                return field.input;
            })} */}
        </Styled.CreateServiceModal>
    );
};

export default CreateServiceModal;
