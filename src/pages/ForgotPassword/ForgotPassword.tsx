import * as Styled from './ForgotPassword.styled';

import type { CountdownProps } from 'antd';
import { PageEnum } from '@/utils/enums';
import { Typography } from 'antd';
import config from '@/config';
import { forgotPasswordFields } from '@/components/AuthForm/AuthForm.fields';
import { useState } from 'react';

const { Text } = Typography;

const ForgotPassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setIsSubmitting(true);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleCountdownFinish: CountdownProps['onFinish'] = () => {
        console.log('finished!');
        setIsSubmitting(false);
    };

    const redirect = {
        description: 'Back to login?',
        title: 'Login now',
        url: config.routes.public.login,
    };

    const Description = (
        <Styled.ForgotPasswordDescWrapper>
            <Styled.ForgotPasswordDesc>
                Enter your email below to receive password reset instructions.
            </Styled.ForgotPasswordDesc>

            <Styled.ForgotPasswordText>
                {isSubmitting && (
                    <Text>
                        Didn’t receive instructions? Try again after
                        {isSubmitting && (
                            <Styled.ForgotPasswordCountdown
                                value={Date.now() + 1000 * 60}
                                format="ss"
                                onFinish={handleCountdownFinish}
                            />
                        )}
                        s
                    </Text>
                )}
            </Styled.ForgotPasswordText>
        </Styled.ForgotPasswordDescWrapper>
    );

    return (
        <Styled.AuthFormStyled
            page={PageEnum.FORGOT_PASSWORD}
            title="Forgot Password?"
            formTitle="Forgot password"
            buttonTitle="Reset Password"
            fields={forgotPasswordFields}
            Description={Description}
            redirect={redirect}
            isSubmitting={isSubmitting}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        />
    );
};

export default ForgotPassword;
