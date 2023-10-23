import * as Styled from '@/pages/Admin/CreateService/CreateService.styled';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { FormType } from '@/pages/Admin/CreateService/CreateService';
import InputSingleService from '../data-entry/InputSingleService';
import InputQuantity from '../data-entry/InputQuantity';

type VariantFormProps = {
    form: FormType;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
};

const SingleServiceForm = ({ form, onFinish, onFinishFailed }: VariantFormProps) => {
    const validateWhitespace = (_: unknown, value: string) => {
        if (value && value.trim() === '') {
            return Promise.reject('Vui lòng chon');
        }
        return Promise.resolve();
    };

    return (
        <Styled.ServiceDetailForm
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            name="dynamic_form_complex"
            // style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={{ types: [{}] }}
        >
            <Styled.ServiceDetailForm.List name="types">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                        {fields.map((field) => (
                            <Card
                                size="small"
                                title={`Dịch vụ ${field.name + 1}`}
                                key={field.key}
                                extra={
                                    <CloseOutlined
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                    />
                                }
                            >
                                <Styled.ServiceDetailForm.Item
                                    label={`Loại ${field.name + 1}`}
                                    wrapperCol={{ offset: 1, span: 24 }}
                                    name={[field.name]}
                                    rules={[
                                        { required: true, message: 'Vui lòng chọn dịch vụ' },
                                        { validator: validateWhitespace },
                                    ]}
                                >
                                    <InputSingleService index={field.name} />
                                </Styled.ServiceDetailForm.Item>
                                <Styled.ServiceDetailForm.Item
                                    label="Quantity"
                                    name={`quantity-${field.name}`}
                                    rules={[
                                        { required: true, message: 'Quantity cannot be empty!!' },
                                    ]}
                                    wrapperCol={{ offset: 1, span: 24 }}
                                >
                                    <InputQuantity name={field.name} />
                                </Styled.ServiceDetailForm.Item>
                            </Card>
                        ))}

                        {fields.length < 4 && (
                            <Button type="dashed" onClick={() => add()} block>
                                + Add Item
                            </Button>
                        )}
                    </div>
                )}
            </Styled.ServiceDetailForm.List>
        </Styled.ServiceDetailForm>
    );
};

export default SingleServiceForm;
