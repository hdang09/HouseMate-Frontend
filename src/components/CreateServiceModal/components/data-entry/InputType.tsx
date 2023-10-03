import { Form, Select } from 'antd';
import { brandType } from '../../CreateServiceModal.types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { scheduleSlice } from '../slice';

type InputTypeProps = {
    type: brandType[];
};

function InputType({ type }: InputTypeProps) {
    const dispatch = useAppDispatch();

    const handleTypeChange = (value: string) => {
        dispatch(scheduleSlice.actions.setType(value));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'type', value: value }));
    };

    return (
        <Form.Item
            label="Type"
            name="type"
            wrapperCol={{ offset: 0, span: 24 }}
            rules={[{ required: true, message: 'Type cannot be empty!!' }]}
        >
            <Select placeholder="Choose type" onChange={handleTypeChange}>
                {type.map((type, index) => {
                    return (
                        <Select.Option value={type.value} key={index}>
                            {type.label}
                        </Select.Option>
                    );
                })}
            </Select>
        </Form.Item>
    );
}

export default InputType;
