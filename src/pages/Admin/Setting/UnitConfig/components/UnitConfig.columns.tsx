import { ServiceText, ServiceActions } from '@/pages/Admin/ServiceList/ServiceList.styled';
import { ColumnsType } from 'antd/es/table';
import { ServiceConfigType } from './UnitConfig.type';
import { ModalEnum } from '@/utils/enums';

const UnitConfigColumns = (
    showModal: (id: number, variant: string) => void,
    deleteConfirm: (id: number) => void,
) => {
    const columns: ColumnsType<ServiceConfigType> = [
        {
            title: 'Đơn vị',
            render: (record: ServiceConfigType) => <ServiceText>{record.configValue}</ServiceText>,
        },

        {
            title: 'Thao tác',
            render: (record: ServiceConfigType) => {
                return (
                    <ServiceActions>
                        <ServiceText
                            onClick={() => showModal(record.serviceConfigId, ModalEnum.VIEW)}
                        >
                            Chỉnh sửa
                        </ServiceText>
                        <ServiceText onClick={() => deleteConfirm(record.serviceConfigId)}>
                            Xóa
                        </ServiceText>
                    </ServiceActions>
                );
            },
        },
    ];

    return columns;
};

export default UnitConfigColumns;
