import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthForm from '@/components/AuthForm';
import { registerFields } from '@/components/AuthForm/AuthForm.fields';
import config from '@/config';
import { register } from '@/utils/authAPI';
import cookieUtils from '@/utils/cookieUtils';
import { PageEnum } from '@/utils/enums';

const Register = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);

            const { data } = await register(values);

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
        description: 'Already a member?',
        title: 'Login now',
        url: config.routes.public.login,
    };

    return (
        <>
            {contextHolder}
            <AuthForm
                page={PageEnum.REGISTER}
                pageTitle="Register"
                formTitle="Register"
                buttonTitle="Register"
                fields={registerFields}
                redirect={redirect}
                onFinish={onFinish}
                reverse
                isSubmitting={isSubmitting}
            />
        </>
    );
};

export default Register;
