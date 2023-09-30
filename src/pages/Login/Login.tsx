import * as Styled from './Login.styled';

import AuthForm from '@/components/AuthForm';
import Link from '@/components/Link';
import { PageEnum } from '@/utils/enums';
import { Typography } from 'antd';
import config from '@/config';
import { login } from '@/utils/authAPI';
import { loginFields } from '@/components/AuthForm/AuthForm.fields';

const { Text } = Typography;

const onFinish = async (values: any) => {
    const response = await login(values);
    console.log(response);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const Login = () => {
    const redirect = {
        description: 'Not a member?',
        title: 'Register now',
        url: config.routes.public.register,
    };

    const Description = (
        <Styled.LoginDesc>
            Home Services Simplified with
            <Link to={config.routes.public.home} underline scroll>
                <Text>House</Text>
                <Text>Mate</Text>
            </Link>
            by Your Side. Get started for free.
        </Styled.LoginDesc>
    );

    return (
        <AuthForm
            page={PageEnum.LOGIN}
            title="Login"
            formTitle="Welcome back!"
            buttonTitle="Login"
            fields={loginFields}
            Description={Description}
            redirect={redirect}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        />
    );
};

export default Login;
