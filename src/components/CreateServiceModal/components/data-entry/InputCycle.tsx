import { useAppDispatch } from '@/hooks';
import { Form, Select } from 'antd';
import { scheduleSlice } from '@/components/CreateServiceModal/components/slice';

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
            wrapperCol={{ offset: 0, span: 12 }}
        >
            <Select placeholder="Choose cycle" onChange={handleCycleChange}>
                <Select.Option value="only-one-time">Only one time</Select.Option>
                <Select.Option value="every-week">Every week</Select.Option>
            </Select>
        </Form.Item>
    );
};

export default InputCycle;
