import CreateServiceModal from '@/components/CreateServiceModal/CreateServiceModal';
import { Button } from 'antd';

import { useState } from 'react';

const PurchasedDetail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
   

    const showModal = () => {
        setIsModalOpen(true);
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

            <CreateServiceModal
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                title="Set a new schedule"
                variant="Create"
            ></CreateServiceModal>
        </div>
    );
};

PurchasedDetail.propTypes = {};

export default PurchasedDetail;
