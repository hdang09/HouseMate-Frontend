import { useAppDispatch } from '@/hooks';
import * as Styled from '@/pages/Admin/CreateSingleService/CreateSingleService.styled';
import { ServiceCategory } from '@/utils/enums';
import { Select } from 'antd';
import { singleServiceSlice } from '../slice';

const InputCategory = () => {
    const dispatch = useAppDispatch();

    const handleCategoryChange = (value: string) => {
        dispatch(singleServiceSlice.actions.setCategory(value));
    };

    return (
        <Styled.ServiceDetailForm.Item
            label="Nhóm dịch vụ"
            name="category"
            rules={[{ required: true, message: 'Vui lòng chọn nhóm dịch vụ' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <Select placeholder="Nhóm dịch vụ" onChange={handleCategoryChange}>
                <Select.Option value={ServiceCategory.HOURLY_SERVICE}>Theo giờ</Select.Option>
                <Select.Option value={ServiceCategory.RETURN_SERVICE}>Gửi trả</Select.Option>
                <Select.Option value={ServiceCategory.DELIVERY_SERVICE}>Giao hàng</Select.Option>
            </Select>
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputCategory;
