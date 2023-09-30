import AuthForm from '@/components/AuthForm';
import { PageEnum } from '@/utils/enums';
import config from '@/config';
import { register } from '@/utils/authAPI';
import { registerFields } from '@/components/AuthForm/AuthForm.fields';

const onFinish = async (values: any) => {
    const response = await register(values);
    console.log(response);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const Register = () => {
    const redirect = {
        description: 'Already a member?',
        title: 'Login now',
        url: config.routes.public.login,
    };

    return (
        <AuthForm
            page={PageEnum.REGISTER}
            pageTitle="Register"
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
