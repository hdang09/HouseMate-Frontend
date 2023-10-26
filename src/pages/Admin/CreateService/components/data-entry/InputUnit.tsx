import { useAppDispatch } from '@/hooks';
import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';
import { Category, UnitOfMeasure } from '@/utils/enums';
import { Select } from 'antd';
import { createServiceSlice } from '../slice';

type InputUnitType = {
    serviceType: string;
    label: string;
    name: string;
};

const InputUnit = ({ serviceType, label, name }: InputUnitType) => {
    const dispatch = useAppDispatch();

    const handleOnChange = (value: string) => {
        dispatch(createServiceSlice.actions.setUnitProduct(value));
    };

    return (
        <Styled.ServiceDetailForm.Item
            label={label}
            name={name}
            rules={[{ required: true, message: 'Vui lòng chọn đơn vị' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <Select placeholder={label} onChange={handleOnChange}>
                {serviceType === Category.PACKAGE_SERVICE.toLowerCase() && (
                    <Select.Option value={UnitOfMeasure.COMBO}>Combo</Select.Option>
                )}

                {serviceType !== Category.PACKAGE_SERVICE.toLowerCase() && (
                    <>
                        <Select.Option value={UnitOfMeasure.HOUR}>Giờ</Select.Option>
                        <Select.Option value={UnitOfMeasure.TIMES}>Số lần</Select.Option>
                        <Select.Option value={UnitOfMeasure.KG}>Kg</Select.Option>
                        <Select.Option value={UnitOfMeasure.ITEM}>Bình</Select.Option>
                    </>
                )}
            </Select>
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputUnit;
