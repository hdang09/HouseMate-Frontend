import { Col, Typography } from 'antd';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

import Container from '@/components/Container';
import { Page } from '@/utils/enums';
import config from '@/config';

import images, { fallbackImg } from './AuthForm.images';
import { FieldType } from './AuthForm.fields';
import * as FormStyled from './AuthForm.styled';

const { Text } = Typography;

type RedirectType = {
    description: string;
    title: string;
    url: string;
};

type AuthFormType = {
    className?: string;
    page: string;
    formTitle: string;
    buttonTitle: string;
    fields: FieldType[];
    Description?: JSX.Element;
    redirect: RedirectType;
    onFinish: (values: unknown) => void;
    onFinishFailed: (values: unknown) => void;
    reverse?: boolean;
};

const AuthForm = ({
    className,
    page,
    formTitle,
    buttonTitle,
    fields,
    Description,
    redirect,
    onFinish,
    onFinishFailed,
    reverse = false,
}: AuthFormType) => {
    useEffect(() => {
        document.title = `${page} | HouseMate`;
    }, []);

    return (
        <Container>
            <FormStyled.AuthForm className={className}>
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
                                        {buttonTitle}
                                    </FormStyled.FormButton>
                                </FormStyled.FormItem>
                            </FormStyled.FormWrapper>

                            <FormStyled.FormGoogleButton to={config.routes.home}>
                                <FcGoogle />
                                <Text>Continue With Google</Text>
                            </FormStyled.FormGoogleButton>

                            <FormStyled.FormRedirect>
                                {redirect.description}

                                <Link to={redirect.url}>{redirect.title}</Link>
                            </FormStyled.FormRedirect>

                            {page === Page.LOGIN && (
                                <FormStyled.FormForgotPassword to={config.routes.forgot}>
                                    Forgot password
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
                                        width="100%"
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
