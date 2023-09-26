import { Typography } from 'antd';
import AuthForm from '@/components/AuthForm';
import { loginFields } from '@/components/AuthForm/AuthForm.fields';
import config from '@/config';
import { Link } from 'react-router-dom';

import * as Styled from './Login.styled';

const { Text } = Typography;

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const Login = () => {
    const redirect = {
        description: 'Not a member?',
        title: 'Register now',
        url: config.routes.register,
    };

    const Description = (
        <Styled.LoginDesc>
            Home Services Simplified with
            <Link to={config.routes.home}>
                <Text>House</Text>
                <Text>Mate</Text>
            </Link>
            by Your Side. Get started for free.
        </Styled.LoginDesc>
    );

    return (
        <AuthForm
            page="Login"
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
