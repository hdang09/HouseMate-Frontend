import * as Styled from '@/pages/Admin/ManageService/CreateService.styled';
import TextArea from 'antd/lib/input/TextArea';

const InputDescription = () => {
    const validateWhitespace = (_: unknown, value: string) => {
        if (value && value.trim() === '') {
            return Promise.reject('Vui lòng nhập mô tả');
        }
        return Promise.resolve();
    };

    return (
        <Styled.ServiceDetailForm.Item
            label="Mô tả"
            name="description"
            rules={[
                { required: true, message: 'Vui lòng nhập mô tả' },
                { validator: validateWhitespace },
            ]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <TextArea
                showCount
                maxLength={1000}
                style={{ height: 120, marginBottom: 24 }}
                placeholder="Mô tả chi tiết của dịch vụ"
            />
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputDescription;
