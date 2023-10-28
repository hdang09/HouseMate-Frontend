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
            initialValues={{ servicesList: [{}] }}
        >
            <Styled.ServiceDetailForm.List name="servicesList">
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
                                    label={'Tên:'}
                                    wrapperCol={{ offset: 1, span: 24 }}
                                    name={[field.name, 'services']}
                                    rules={[{ required: true, message: 'Vui lòng chọn dịch vụ' }]}
                                >
                                    <InputSingleService
                                        index={field.name}
                                        value={form.getFieldValue([field.name])}
                                        onChange={(value) => {
                                            form.setFieldsValue({
                                                [field.name]: {
                                                    ...form.getFieldValue(field.name),
                                                    [field.name]: value,
                                                },
                                            });
                                        }}
                                    />
                                </Styled.ServiceDetailForm.Item>
                                <Styled.ServiceDetailForm.Item
                                    label="Quantity"
                                    name={[field.name, 'Quantity']}
                                    rules={[
                                        { required: true, message: 'Vui lòng chọn số lượng!!' },
                                    ]}
                                    wrapperCol={{ offset: 1, span: 24 }}
                                >
                                    <InputQuantity
                                        name={field.name}
                                        value={form.getFieldValue([field.name])}
                                        onChange={(value) => {
                                            console.log(value);
                                            value;
                                            form.setFieldsValue({
                                                [field.name]: {
                                                    ...form.getFieldValue(field.name),
                                                    [`unit_${field.name}`]: value,
                                                },
                                            });
                                        }}
                                    />
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
