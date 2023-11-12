import * as Styled from '@/pages/Admin/ManageService/CreateService.styled';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { FormType } from '@/pages/Admin/ManageService/CreateService';
import InputSingleService from '../data-entry/InputSingleService';
import InputQuantity from '../data-entry/InputQuantity';
import { useAppSelector } from '@/hooks';
import { ModalEnum } from '@/utils/enums';

type VariantFormProps = {
    form: FormType;
    onFinish: (value: any) => void;
    onFinishFailed: (value: any) => void;
    variant: string;
};

const SingleServiceForm = ({ variant, form, onFinish, onFinishFailed }: VariantFormProps) => {
    const serviceItem = useAppSelector((state) => state.upload.packageServiceItemList);

    const initialServiceList = serviceItem?.map((item) => ({
        services: item.service.titleName,
        Quantity: item.quantity,
    }));

    return (
        <Styled.ServiceDetailForm
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            name="dynamic_form_complex"
            autoComplete="off"
            initialValues={{ servicesList: initialServiceList }}
            disabled={variant === ModalEnum.VIEW}
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

                        <Button type="dashed" onClick={() => add()} block>
                            + Add Item
                        </Button>
                    </div>
                )}
            </Styled.ServiceDetailForm.List>
        </Styled.ServiceDetailForm>
    );
};

export default SingleServiceForm;
