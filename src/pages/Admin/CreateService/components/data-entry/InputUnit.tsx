import { useAppSelector } from '@/hooks';
import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';
import { ServiceCategory, UnitOfMeasure } from '@/utils/enums';
import { Select } from 'antd';
const InputUnit = () => {
    const category = useAppSelector((state) => state.createService.groupType);
    const selectedValue = category === ServiceCategory.HOURLY_SERVICE ? UnitOfMeasure.HOUR : null;
    return (
        <Styled.ServiceDetailForm.Item
            label="Đơn vị"
            name="unit"
            rules={[{ required: true, message: 'Vui lòng chọn đơn vị' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <Select
                placeholder="Đơn vị dịch vụ"
                value={selectedValue}
                // TODO: CONSTRAINT CATEGORY AND UNIT (HOURLY SERVICE -> UNIT = GIỜ)
                // disabled={category === 'HOURLY_SERVICE'}
            >
                <Select.Option value={UnitOfMeasure.HOUR}>Giờ</Select.Option>
                <Select.Option value={UnitOfMeasure.TIMES}>Số lần</Select.Option>
                <Select.Option value={UnitOfMeasure.ITEM}>Bình/Cái/Sản phẩm</Select.Option>
            </Select>
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputUnit;
