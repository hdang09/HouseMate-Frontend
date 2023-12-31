import * as Styled from '@/pages/Admin/ManageService/CreateService.styled';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Form, Input } from 'antd';
import { FormType } from '@/pages/Admin/ManageService/CreateService';

type VariantFormProps = {
    form: FormType;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
    typeList: string[];
};

const VariantForm = ({ typeList, form, onFinish, onFinishFailed }: VariantFormProps) => {
    form.setFieldsValue({ types: typeList });

    const validateWhitespace = (_: unknown, value: string) => {
        if (value && value.trim() === '') {
            return Promise.reject('Vui lòng nhập phân loại');
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
            autoComplete="off"
            initialValues={{ types: typeList }}
        >
            <Form.List name="types">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                        {fields.map((field, index) => {
                            const fieldValue = form.getFieldValue(['types', index]);
                            return (
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
                                            <Input
                                                value={fieldValue}
                                                onChange={(value) => {
                                                    form.setFieldsValue({
                                                        [field.name]: {
                                                            ...form.getFieldValue(field.name),
                                                            [field.name]: value,
                                                        },
                                                    });
                                                }}
                                            />
                                            <CloseOutlined
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        </Flex>
                                    </Form.Item>
                                </Col>
                            );
                        })}

                        <Button type="dashed" onClick={() => add()} block>
                            + Add Item
                        </Button>
                    </div>
                )}
            </Form.List>
        </Styled.ServiceDetailForm>
    );
};

export default VariantForm;
