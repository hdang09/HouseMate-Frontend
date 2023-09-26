import * as Styled from './Login.styled';

import AuthForm from '@/components/AuthForm';
import Link from '@/components/Link';
import { Typography } from 'antd';
import config from '@/config';
import { loginFields } from '@/components/AuthForm/AuthForm.fields';

const { Text } = Typography;

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
            Description={
                <Styled.LoginDesc>
                    Home Services Simplified with
                    <Link to={config.routes.home}>
                        <Text>House</Text>
                        <Text>Mate</Text>
                    </Link>
                    by Your Side. Get started for free.
                </Styled.LoginDesc>
            }
            redirectDesc="Not a member?"
            redirectText="Register now"
            redirectLink={config.routes.register}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        />
    );
};

export default Login;
