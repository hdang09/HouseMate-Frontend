import { useAppDispatch } from '@/hooks';
import * as Styled from '@/pages/Admin/ManageService/CreateService.styled';
import { SaleStatus, SaleStatusLabel } from '@/utils/enums';
import { Select } from 'antd';
import { createServiceSlice } from '../slice';

const InputSaleStatus = () => {
    const dispatch = useAppDispatch();

    const handleCategoryChange = (value: string) => {
        dispatch(createServiceSlice.actions.setGroupType(value));
    };

    return (
        <Styled.ServiceDetailForm.Item
            label="Trạng thái"
            name="saleStatus"
            rules={[{ required: true, message: 'Vui lòng chọn nhóm dịch vụ' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <Select placeholder="Nhóm dịch vụ" onChange={handleCategoryChange}>
                <Select.Option value={SaleStatus.AVAILABLE}>
                    {SaleStatusLabel.AVAILABLE}
                </Select.Option>
                <Select.Option value={SaleStatus.DISCONTINUED}>
                    {SaleStatusLabel.DISCONTINUED}
                </Select.Option>
                <Select.Option value={SaleStatus.ONSALE}> {SaleStatusLabel.ONSALE}</Select.Option>
            </Select>
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputSaleStatus;
