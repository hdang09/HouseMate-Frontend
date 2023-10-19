import * as Styled from '@/pages/Admin/CreateSingleService/CreateSingleService.styled';
import { CategoryServiceEnum } from '@/utils/enums';
import { Select } from 'antd';

const InputCategory = () => {
    return (
        <Styled.ServiceDetailForm.Item
            label="Nhóm dịch vụ"
            name="category"
            rules={[{ required: true, message: 'Vui lòng chọn nhóm dịch vụ' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <Select placeholder="Nhóm dịch vụ">
                <Select.Option value={CategoryServiceEnum.HOURLY_SERVICE}>Theo giờ</Select.Option>
                <Select.Option value={CategoryServiceEnum.RETURN_SERVICE}>Gửi trả</Select.Option>
                <Select.Option value={CategoryServiceEnum.DELIVERY_SERVICE}>
                    Giao hàng
                </Select.Option>
            </Select>
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputCategory;
