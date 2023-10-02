import AuthForm from '@/components/AuthForm';
import { PageEnum } from '@/utils/enums';
import { SetPasswordDesc } from './SetPassword.styled';
import config from '@/config';
import { setPasswordFields } from '@/components/AuthForm/AuthForm.fields';

const onFinish = async (values: any) => {
    console.log(values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
};

const SetPassword = () => {
    const redirect = {
        description: 'Back to login?',
        title: 'Login Now',
        url: config.routes.public.login,
    };

    const description = (
        <SetPasswordDesc>
            Must be 8 or more characters include a number, an uppercase letter, and a lowercase
            letter.
        </SetPasswordDesc>
    );

    return (
        <AuthForm
            page={PageEnum.SET_PASSWORD}
            pageTitle="Set Password"
            formTitle="Set new password"
            buttonTitle="Reset password"
            fields={setPasswordFields}
            description={description}
            redirect={redirect}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        />
    );
};

export default SetPassword;
