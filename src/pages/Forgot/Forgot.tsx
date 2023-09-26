import { forgotFields } from '@/components/AuthForm/AuthForm.fields';
import Link from '@/components/Link';
import config from '@/config';
import { Page } from '@/utils/enums';

import * as Styled from './Forgot.styled';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const Forgot = () => {
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
                Didn’t receive instructions? {<Link to={config.routes.home}>Send again</Link>}
            </Styled.ForgotText>
        </Styled.ForgotDescWrapper>
    );

    return (
        <Styled.AuthFormStyled
            page={Page.FORGOT}
            formTitle="Forgot password?"
            fields={forgotFields}
            Description={Description}
            redirect={redirect}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        />
    );
};

export default Forgot;
