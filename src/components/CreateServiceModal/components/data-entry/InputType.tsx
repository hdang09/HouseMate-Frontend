import { Form, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';

function InputType() {
    const dispatch = useAppDispatch();
    const types = useAppSelector((state) => state.schedules.types);
    const handleTypeChange = (value: string) => {
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'typeId', value: value }));
    };

    return (
        <Form.Item
            label="Type"
            name="type"
            wrapperCol={{ offset: 0, span: 24 }}
            rules={[{ required: true, message: 'Type cannot be empty!!' }]}
        >
            <Select placeholder="Choose type" onChange={handleTypeChange}>
                {types?.map((type, index) => {
                    return (
                        <Select.Option value={type.serviceTypeId} key={index}>
                            {type.typeName}
                        </Select.Option>
                    );
                })}
            </Select>
        </Form.Item>
    );
}

export default InputType;
