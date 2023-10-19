import * as Styled from '@/pages/Admin/CreateSingleService/CreateSingleService.styled';
import TextArea from 'antd/lib/input/TextArea';

const InputDescription = () => {
    return (
        <Styled.ServiceDetailForm.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
            wrapperCol={{ offset: 0, span: 24 }}
        >
            <TextArea
                showCount
                maxLength={500}
                style={{ height: 120, marginBottom: 24 }}
                placeholder="Mô tả chi tiết của dịch vụ"
                // onChange={handleNoteChange}
            />
        </Styled.ServiceDetailForm.Item>
    );
};

export default InputDescription;
