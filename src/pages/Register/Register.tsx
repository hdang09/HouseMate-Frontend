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
    const redirect = {
        description: 'Already a member?',
        title: 'Login now',
        url: config.routes.login,
    };

    return (
        <AuthForm
            page="Register"
            formTitle="Register"
            buttonTitle="Register"
            fields={registerFields}
            redirect={redirect}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            reverse
        />
    );
};

export default Register;
