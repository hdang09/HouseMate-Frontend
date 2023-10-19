import * as Styled from '@/pages/Admin/CreateSingleService/CreateSingleService.styled';
import { UnitEnum } from '@/utils/enums';
import { Select } from 'antd';
const InputUnit = () => {
    return (
        <Styled.ServiceDetailForm.Item
            label="Đơn vị"
            name="unit"
            rules={[{ required: true, message: 'Vui lòng chọn đơn vị' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <Select placeholder="Đơn vị dịch vụ">
                <Select.Option value={UnitEnum.HOUR}>Giờ</Select.Option>
                <Select.Option value={UnitEnum.KG}>Kg</Select.Option>
                <Select.Option value={UnitEnum.ITEM}>Bình/Cái/Sản phẩm</Select.Option>
                <Select.Option value={UnitEnum.COMBO}>Combo</Select.Option>
            </Select>
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputUnit;
