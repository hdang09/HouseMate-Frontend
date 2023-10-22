import * as Styled from '@/pages/Admin/CreateSingleService/CreateSingleService.styled';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Form, Input } from 'antd';
import { FormType } from '@/pages/Admin/CreateSingleService/CreateSingleService';

type VariantFormProps = {
    form: FormType;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
};

const VariantForm = ({ form, onFinish, onFinishFailed }: VariantFormProps) => {
    const validateWhitespace = (_: unknown, value: string) => {
        if (value && value.trim() === '') {
            return Promise.reject('Vui lòng nhập mô tả');
        }
        return Promise.resolve();
    };

    return (
        <Styled.ServiceDetailForm
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            name="dynamic_form_complex"
            // style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={{ items: [{}] }}
        >
            <Form.List name="types">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                        {fields.map((field, index) => (
                            <Col span={24} key={index}>
                                <Form.Item
                                    label={`Loại ${field.name + 1}`}
                                    name={[field.name]}
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập phân loại' },
                                        { validator: validateWhitespace },
                                    ]}
                                >
                                    <Flex gap={16}>
                                        <Input />
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    </Flex>
                                </Form.Item>
                            </Col>
                        ))}

                        {fields.length < 9 && (
                            <Button type="dashed" onClick={() => add()} block>
                                + Add Item
                            </Button>
                        )}
                    </div>
                )}
            </Form.List>
        </Styled.ServiceDetailForm>
    );
};

export default VariantForm;
