import * as Styled from '@/pages/Admin/CreateSingleService/CreateSingleService.styled';
import { Input } from 'antd';
const InputName = () => {
    return (
        <Styled.ServiceDetailForm.Item
            label="Tên dịch vụ"
            name="serviceName"
            rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ ' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <Input />
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputName;
