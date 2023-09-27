import { Typography } from 'antd';
import type { CountdownProps } from 'antd';
import { useState } from 'react';

import { forgotFields } from '@/components/AuthForm/AuthForm.fields';
import config from '@/config';
import { PageEnum } from '@/utils/enums';

import * as Styled from './Forgot.styled';

const { Text } = Typography;

const Forgot = () => {
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
        url: config.routes.login,
    };

    const Description = (
        <Styled.ForgotDescWrapper>
            <Styled.ForgotDesc>
                Enter your email below to receive password reset instructions.
            </Styled.ForgotDesc>

            <Styled.ForgotText>
                Didn’t receive instructions?
                {isSubmitting && (
                    <Text>
                        Try again after
                        {isSubmitting && (
                            <Styled.ForgotCountdown
                                value={Date.now() + 1000 * 60}
                                format="ss"
                                onFinish={handleCountdownFinish}
                            />
                        )}
                        s
                    </Text>
                )}
            </Styled.ForgotText>
        </Styled.ForgotDescWrapper>
    );

    return (
        <Styled.AuthFormStyled
            page={PageEnum.FORGOT}
            title="Forgot Password?"
            formTitle="Forgot password?"
            buttonTitle="Reset Password"
            fields={forgotFields}
            Description={Description}
            redirect={redirect}
            isSubmitting={isSubmitting}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        />
    );
};

export default Forgot;
