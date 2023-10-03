import { DatePicker, Form } from 'antd';

type InputDate = {
    label: string;
    type?: string;
};

const InputDate = ({ label, type }: InputDate) => {
    return (
        <Form.Item label={label} name={type ? type : 'Date'}>
            <DatePicker />
        </Form.Item>
    );
};

export default InputDate;
