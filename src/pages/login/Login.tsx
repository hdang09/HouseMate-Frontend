import AuthForm from '@/components/AuthForm';
import { loginFields } from '@/components/AuthForm/AuthForm.fields';

import config from '@/config';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const Login = () => {
    return (
        <AuthForm
            page="Login"
            formTitle="Welcome back!"
            fields={loginFields}
            redirectDesc="Not a member?"
            redirectText="Register now"
            redirectLink={config.routes.register}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        />
    );
};

export default Login;
