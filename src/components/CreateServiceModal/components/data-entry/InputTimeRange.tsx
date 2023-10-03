import { Form, TimePicker } from 'antd';

const InputTimeRange = () => {
    return (
        <Form.Item label="Time" name="timeRange">
            <TimePicker.RangePicker format="h:mm " />
        </Form.Item>
    );
};

export default InputTimeRange;
