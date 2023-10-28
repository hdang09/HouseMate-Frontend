import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';
import { Category } from '@/utils/enums';
import { Select } from 'antd';
import { getAllUnit } from '@/utils/serviceAPI';
import { useEffect, useState } from 'react';

type InputUnitType = {
    serviceType: string;
    label: string;
    name: string;
};

type ServiceUnitType = {
    service_config_id: number;
    configType: string;
    configValue: string;
};
type ServiceConfigType = {
    SERVICE_UNITS: ServiceUnitType[];
    SERVICE_GROUPS: ServiceUnitType[];
};

const InputUnit = ({ serviceType, label, name }: InputUnitType) => {
    const [unitList, setUnitList] = useState<ServiceConfigType>({
        SERVICE_UNITS: [],
        SERVICE_GROUPS: [],
    });

    useEffect(() => {
        (async () => {
            try {
                const { data }: { data: ServiceConfigType } = await getAllUnit();
                setUnitList(data);
            } catch (error: any) {
                console.log(error.response ? error.response.data : error.message);
            } finally {
            }
        })();
    }, []);

    return (
        <Styled.ServiceDetailForm.Item
            label={label}
            name={name}
            rules={[{ required: true, message: 'Vui lòng chọn đơn vị' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <Select placeholder={label}>
                {serviceType === Category.PACKAGE_SERVICE.toLowerCase() && (
                    <Select.Option value={'COMBO'}>Gói</Select.Option>
                )}
                {/* ĐỢI BE SỬA CODE */}
                {serviceType !== Category.PACKAGE_SERVICE.toLowerCase() && (
                    <>
                        {unitList.SERVICE_UNITS.map((unit) => (
                            <Select.Option value={unit.configValue}>
                                {unit.configValue}
                            </Select.Option>
                        ))}
                    </>
                )}
            </Select>
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputUnit;
