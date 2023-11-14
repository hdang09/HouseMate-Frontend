// import { FormType } from '@/pages/Admin/ManageService/CreateService';
// import * as Styled from '@/pages/Admin/Setting/Setting.styled';
// import { CloseOutlined } from '@ant-design/icons';
// import { Button, Col, Flex, Input } from 'antd';
// import { ServiceConfigMap } from '../..';

// type ServiceConfigFormProps = {
//     form: FormType;
//     serviceConfig: ServiceConfigMap;
//     onFinish: (value: any) => void;
//     onFinishFailed: (value: any) => void;
// };

// const ServiceConfigForm = ({
//     form,
//     serviceConfig,
//     onFinish,
//     onFinishFailed,
// }: ServiceConfigFormProps) => {
//     const validateWhitespace = (_: unknown, value: string) => {
//         if (value && value.trim() === '') {
//             return Promise.reject('Vui lòng nhập phân loại');
//         }
//         return Promise.resolve();
//     };
//     const initialUnits = serviceConfig.SERVICE_UNITS.map((unit) => ({
//         name: unit.configValue,
//         value: unit.configValue,
//     }));

//     form.setFieldsValue({
//         units: initialUnits,
//     });

//     return (
//         <Styled.SettingForm
//             form={form}
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}
//             wrapperCol={{ span: 12 }}
//             layout="vertical"
//         >
//             <Styled.SettingForm.List name="units">
//                 {(fields, { add, remove }) => (
//                     <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
//                         {fields.map((field, index) => {
//                             const fieldValue = form.getFieldValue(['units', index, 'value']);
//                             return (
//                                 <Col span={24} key={index}>
//                                     <Styled.SettingForm.Item
//                                         label={'Đơn vị'}
//                                         name={[field.name, 'units']}
//                                         rules={[
//                                             { required: true, message: 'Vui lòng nhập phân loại' },
//                                             { validator: validateWhitespace },
//                                         ]}
//                                     >
//                                         <Flex gap={16}>
//                                             <Input
//                                                 value={fieldValue}
//                                                 onChange={(value) => {
//                                                     form.setFieldsValue({
//                                                         [field.name]: {
//                                                             ...form.getFieldValue(field.name),
//                                                             [`unit_${field.name}`]: value,
//                                                         },
//                                                     });
//                                                 }}
//                                             />
//                                             <CloseOutlined
//                                                 onClick={() => {
//                                                     remove(field.name);
//                                                 }}
//                                             />
//                                         </Flex>
//                                     </Styled.SettingForm.Item>
//                                 </Col>
//                             );
//                         })}

//                         {fields.length < 9 && (
//                             <Button type="dashed" onClick={() => add()} block>
//                                 + Thêm đơn vị
//                             </Button>
//                         )}
//                     </div>
//                 )}
//             </Styled.SettingForm.List>
//         </Styled.SettingForm>
//     );
// };

// export default ServiceConfigForm;
