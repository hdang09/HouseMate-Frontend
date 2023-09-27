import CreateServiceModal from '@/components/CreateServiceModal/CreateServiceModal';
import { Button } from 'antd';

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

           <CreateServiceModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel}></CreateServiceModal>
        </div>
    );
};

ViewServiceDetail.propTypes = {};

export default ViewServiceDetail;
