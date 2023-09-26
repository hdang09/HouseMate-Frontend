import { Col, Typography } from 'antd';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';

import Container from '@/components/Container';
import { Page } from '@/utils/enums';
import Link from '@/components/Link';
import config from '@/config';

import images, { fallbackImg } from './AuthForm.images';
import { Field } from './AuthForm.fields';
import * as FormStyled from './AuthForm.styled';

const { Text } = Typography;

type AuthForm = {
    page: string;
    formTitle: string;
    fields: Field[];
    Description?: JSX.Element;
    redirectDesc: string;
    redirectText: string;
    redirectLink: string;
    onFinish: (values: unknown) => void;
    onFinishFailed: (values: unknown) => void;
    reverse?: boolean;
};

const AuthForm = ({
    page,
    formTitle,
    fields,
    Description,
    redirectDesc,
    redirectText,
    redirectLink,
    onFinish,
    onFinishFailed,
    reverse = false,
}: AuthForm) => {
    useEffect(() => {
        document.title = `${page} | HouseMate`;
    }, []);

    return (
        <Container>
            <FormStyled.AuthForm>
                <FormStyled.FormRow
                    align="middle"
                    style={{
                        flexDirection: reverse ? 'row-reverse' : 'row',
                    }}
                >
                    <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                        <FormStyled.FormContainer>
                            <FormStyled.FormTitle level={1}>{formTitle}</FormStyled.FormTitle>

                            {Description}

                            <FormStyled.FormWrapper
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                layout="vertical"
                                requiredMark={false}
                                autoComplete="off"
                            >
                                {fields.map((field) => (
                                    <FormStyled.FormItem
                                        key={field.key}
                                        label={field.label}
                                        name={field.name}
                                        rules={field.rules}
                                    >
                                        {field.children}
                                    </FormStyled.FormItem>
                                ))}

                                <FormStyled.FormItem>
                                    <FormStyled.FormButton block type="primary" htmlType="submit">
                                        {page}
                                    </FormStyled.FormButton>
                                </FormStyled.FormItem>
                            </FormStyled.FormWrapper>

                            <FormStyled.FormGoogleButton to={config.routes.home}>
                                <FcGoogle />
                                <Text>Log in with Google</Text>
                            </FormStyled.FormGoogleButton>

                            <FormStyled.FormRedirect>
                                {redirectDesc}

                                <Link to={redirectLink}>{redirectText}</Link>
                            </FormStyled.FormRedirect>

                            {page === Page.LOGIN && (
                                <FormStyled.FormForgotPassword to={config.routes.forgot}>
                                    Forgot password?
                                </FormStyled.FormForgotPassword>
                            )}
                        </FormStyled.FormContainer>
                    </Col>

                    <Col lg={{ span: 12 }} sm={{ span: 0 }} xs={{ span: 0 }}>
                        <FormStyled.FormCarousel autoplay>
                            {images.map((image) => (
                                <FormStyled.FormImageWrapper key={image.id}>
                                    <FormStyled.FormImageOverlay />

                                    <FormStyled.FormImage
                                        width={497}
                                        height={652}
                                        src={image.src}
                                        alt="Form Carousel"
                                        preview={false}
                                        fallback={fallbackImg}
                                    />
                                </FormStyled.FormImageWrapper>
                            ))}
                        </FormStyled.FormCarousel>
                    </Col>
                </FormStyled.FormRow>
            </FormStyled.AuthForm>
        </Container>
    );
};

export default AuthForm;
