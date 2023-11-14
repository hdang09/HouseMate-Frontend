import { ConfigType } from '@/pages/Admin/ManageService/CreateService';
import { ServiceText, ServiceActions } from '@/pages/Admin/ServiceList/ServiceList.styled';
import { ColumnsType } from 'antd/es/table';

const PriceConfigColumns = (showModal: (id: number) => void) => {
    const columns: ColumnsType<ConfigType> = [
        {
            title: 'Chu kỳ',
            render: (record: ConfigType) => (
                <ServiceText>
                    {record.configValue} {record.configName}
                </ServiceText>
            ),
        },
        {
            title: 'Tối thiểu',
            render: (record: ConfigType) => <ServiceText>{record.min}</ServiceText>,
        },
        {
            title: 'Tối đa',
            render: (record: ConfigType) => <ServiceText>{record.max}</ServiceText>,
        },
        {
            title: 'Thao tác',
            render: (record: ConfigType) => {
                return (
                    <ServiceActions>
                        <ServiceText onClick={() => showModal(record.configId)}>
                            Chỉnh sửa
                        </ServiceText>
                    </ServiceActions>
                );
            },
        },
    ];

    return columns;
};

export default PriceConfigColumns;
