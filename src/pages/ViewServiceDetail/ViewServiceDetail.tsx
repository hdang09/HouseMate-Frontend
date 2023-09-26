import { Button, Modal } from 'antd';

import { useState } from 'react';

const ViewServiceDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>ViewServiceDetail</h1>

            <Button type="primary" onClick={showModal}>
                + New schedule
            </Button>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
};

ViewServiceDetail.propTypes = {};

export default ViewServiceDetail;
