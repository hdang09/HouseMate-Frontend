import AuthForm from '@/components/AuthForm';
import { setPasswordFields } from '@/components/AuthForm/AuthForm.fields';
import config from '@/config';
import { PageEnum } from '@/utils/enums';
import { SetPasswordDesc } from './SetPassword.styled';

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
        url: config.routes.login,
    };

    const Description = (
        <SetPasswordDesc>
            Must be 8 or more characters include a number, an uppercase letter, and a lowercase
            letter.
        </SetPasswordDesc>
    );

    return (
        <AuthForm
            page={PageEnum.SET_PASSWORD}
            title="Set Password"
            formTitle="Set new password"
            buttonTitle="Reset password"
            fields={setPasswordFields}
            Description={Description}
            redirect={redirect}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        />
    );
};

export default SetPassword;
