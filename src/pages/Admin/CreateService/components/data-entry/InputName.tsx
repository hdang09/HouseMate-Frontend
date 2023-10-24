import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';
import { Input } from 'antd';

const InputName = () => {
    const validateWhitespace = (_: unknown, value: string) => {
        if (value && value.trim() === '') {
            return Promise.reject('Vui lòng nhập tên dịch vụ ');
        }
        return Promise.resolve();
    };

    return (
        <Styled.ServiceDetailForm.Item
            label="Tên dịch vụ"
            name="titleName"
            rules={[
                { required: true, message: 'Vui lòng nhập tên dịch vụ' },
                { validator: validateWhitespace },
            ]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <Input />
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputName;
