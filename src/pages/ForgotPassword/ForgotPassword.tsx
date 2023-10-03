import * as Styled from './ForgotPassword.styled';

import { Typography, message } from 'antd';
import { useEffect, useState } from 'react';

import { MAX_COUNTDOWN_TIME } from '@/config/constants';
import { PageEnum } from '@/utils/enums';
import config from '@/config';
import { forgotPassword } from '@/utils/authAPI';
import { forgotPasswordFields } from '@/components/AuthForm/AuthForm.fields';

const { Text } = Typography;

const ForgotPassword = () => {
    const [seconds, setSeconds] = useState(0);

    // Handle countdown
    useEffect(() => {
        const timerId = setInterval(() => {
            if (seconds <= 0) return;

            setSeconds((prevSeconds) => {
                const updatedSeconds = prevSeconds - 1;
                localStorage.setItem(config.localStorage.seconds, updatedSeconds.toString());
                return updatedSeconds;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [seconds]);

    // Check if seconds already in localStorage
    useEffect(() => {
        const storedSeconds = localStorage.getItem(config.localStorage.seconds);
        if (storedSeconds) setSeconds(parseInt(storedSeconds));
    }, []);

    // Message toast
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            setSeconds(60);
            localStorage.setItem(config.localStorage.seconds, MAX_COUNTDOWN_TIME.toString());

            // Fetch API
            const { data } = await forgotPassword(values);
            messageApi.success(data);
        } catch (err: any) {
            messageApi.error(err.response.data);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const redirect = {
        description: 'Back to login?',
        title: 'Login now',
        url: config.routes.public.login,
    };

    const description = (
        <Styled.ForgotPasswordDescWrapper>
            <Styled.ForgotPasswordDesc>
                Enter your email below to receive password reset instructions.
            </Styled.ForgotPasswordDesc>

            <Styled.ForgotPasswordText>
                {seconds !== 0 && (
                    <Text>
                        Didn’t receive instructions? Try again after
                        <Styled.ForgotPasswordCountdown>{seconds}</Styled.ForgotPasswordCountdown>s
                    </Text>
                )}
            </Styled.ForgotPasswordText>
        </Styled.ForgotPasswordDescWrapper>
    );

    return (
        <>
            {contextHolder}
            <Styled.AuthFormStyled
                page={PageEnum.FORGOT_PASSWORD}
                pageTitle="Forgot Password?"
                formTitle="Forgot password"
                buttonTitle="Reset Password"
                fields={forgotPasswordFields}
                description={description}
                redirect={redirect}
                isSubmitting={seconds !== 0}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            />
        </>
    );
};

export default ForgotPassword;
