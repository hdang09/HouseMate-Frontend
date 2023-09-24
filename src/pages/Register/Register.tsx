import AuthForm from '@/components/AuthForm';
import { registerFields } from '@/components/AuthForm/AuthForm.fields';

import config from '@/config';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const Register = () => {
    return (
        <AuthForm
            page="Register"
            formTitle="Register"
            fields={registerFields}
            redirectDesc="Already a member?"
            redirectText="Login now"
            redirectLink={config.routes.login}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            reverse
        />
    );
};

export default Register;
