import { Typography, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthForm from '@/components/AuthForm';
import { loginFields } from '@/components/AuthForm/AuthForm.fields';
import Link from '@/components/Link';
import config from '@/config';
import { login } from '@/utils/authAPI';
import cookieUtils from '@/utils/cookieUtils';
import { PageEnum } from '@/utils/enums';

import * as Styled from './Login.styled';

const { Text } = Typography;

const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);

            const { data } = await login(values);

            cookieUtils.setItem(config.localStorage.token, data);
            navigate(config.routes.public.home);
        } catch (error: any) {
            messageApi.open({
                type: 'error',
                content: error.response.data,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const redirect = {
        description: 'Not a member?',
        title: 'Register now',
        url: config.routes.public.register,
    };

    const description = (
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
        <>
            {contextHolder}
            <AuthForm
                page={PageEnum.LOGIN}
                pageTitle="Login"
                formTitle="Welcome back!"
                buttonTitle="Login"
                fields={loginFields}
                description={description}
                redirect={redirect}
                onFinish={onFinish}
                isSubmitting={isSubmitting}
            />
        </>
    );
};

export default Login;
