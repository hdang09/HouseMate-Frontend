import { Form, TimePicker } from 'antd';

type InputTimeProps = {
    type?: string;
};

const InputTime = ({ type }: InputTimeProps) => {
    return (
        <Form.Item label="Time" name={type ? type : 'time'}>
            <TimePicker format="h:mm " />
        </Form.Item>
    );
};

export default InputTime;
