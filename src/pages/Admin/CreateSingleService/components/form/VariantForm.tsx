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
    return (
        <Styled.ServiceDetailForm
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            name="dynamic_form_complex"
            // style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={{ items: [{}] }}
        >
            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                        {fields.map((field, index) => (
                            <Col span={24} key={index}>
                                <Form.Item label={`Loại ${field.name + 1}`} name={[field.name]}>
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
