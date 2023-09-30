// import React from 'react'
import { Col, Divider, Row } from 'antd';
import * as Styled from './CreateServiceModal.styled';
import { fields } from './CreateService.fields';
import { useState } from 'react';

type Props = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
};

const CreateServiceModal = ({ isModalOpen, handleOk, handleCancel }: Props) => {
    const [service, setService] = useState('cleaning-house');
    const handleServiceChange = (value: string) => {
        console.log(`selected ${value}`);
        setService(value);
    };

    return (
        <Styled.CreateServiceModal
            title="Set a new schedule"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Divider />
            <Row>
                {/* <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}> */}
                <Styled.ModalField>
                    <Styled.ModalTitle>Service</Styled.ModalTitle>
                    <Styled.ModalSelect
                        defaultValue="Choose service"
                        style={{ width: 150 }}
                        onChange={handleServiceChange}
                        options={[
                            { value: 'cleaning-house', label: 'Cleaning House' },
                            { value: 'laundry', label: 'Laundry' },
                            { value: 'water-delivery', label: 'Water delivery' },
                            { value: 'rice-delivery', label: 'Rice delivery' },
                        ]}
                    />
                </Styled.ModalField>
                {/* </Col> */}
            </Row>
            {fields.service[service].fieldIds?.map((item, index) => {
                return (
                    <Row key={index}>
                        <Styled.ModalField>
                            <Styled.ModalTitle>{fields.field[item].name}</Styled.ModalTitle>
                            {fields.field[item].input}
                        </Styled.ModalField>
                    </Row>
                );
            })}
            <Divider />
        </Styled.CreateServiceModal>
    );
};

export default CreateServiceModal;
