import { ServiceText, ServiceActions } from '@/pages/Admin/ServiceList/ServiceList.styled';
import { ColumnsType } from 'antd/es/table';
import { Config, ConfigLabel } from '@/utils/enums';
import { ServiceConfigType } from '../../UnitConfig/components/UnitConfig.type';

const ServiceConfigColumns = (showModal: (id: number) => void) => {
    const columns: ColumnsType<ServiceConfigType> = [
        {
            title: 'Cấu hình',
            render: (record: ServiceConfigType) => (
                <ServiceText>{ConfigLabel[record.configType as Config]}</ServiceText>
            ),
        },
        {
            title: 'Đơn vị',
            render: (record: ServiceConfigType) => <ServiceText>{record.configValue}</ServiceText>,
        },

        {
            title: 'Thao tác',
            render: (record: ServiceConfigType) => {
                return (
                    <ServiceActions>
                        <ServiceText onClick={() => showModal(record.serviceConfigId)}>
                            Chỉnh sửa
                        </ServiceText>
                    </ServiceActions>
                );
            },
        },
    ];

    return columns;
};

export default ServiceConfigColumns;
