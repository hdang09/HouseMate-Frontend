import { useAppDispatch } from '@/hooks';
import { Form, Select } from 'antd';
import { scheduleSlice } from '../slice';

const InputCycle = () => {
    const dispatch = useAppDispatch();

    const handleCycleChange = (value: string) => {
        dispatch(scheduleSlice.actions.setCycle(value));
        dispatch(scheduleSlice.actions.setSchedule({ fieldName: 'cycle', value: value }));
    };

    return (
        <Form.Item
            label="Cycle"
            name="cycle"
            rules={[{ required: true, message: 'Cycle cannot be empty!!' }]}
        >
            <Select placeholder="Choose cycle" onChange={handleCycleChange}>
                <Select.Option value="only-one-time">Only one time</Select.Option>
                <Select.Option value="every-week">Every week</Select.Option>
            </Select>
        </Form.Item>
    );
};

export default InputCycle;
