import { Col, List, Typography } from 'antd';
import { useEffect } from 'react';

import Container from '@/components/Container';
import { Page } from '@/utils/enums';
import Link from '@/components/Link';
import config from '@/config';
import * as LoginStyled from '@/pages/Login/Login.styled';

import images, { fallbackImg } from './AuthForm.images';
import { FieldType } from './AuthForm.fields';
import socials from './AuthForm.socials';
import * as FormStyled from './AuthForm.styled';

const { Text } = Typography;

type AuthFormType = {
    page: string;
    formTitle: string;
    fields: FieldType[];
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
    redirectDesc,
    redirectText,
    redirectLink,
    onFinish,
    onFinishFailed,
    reverse = false,
}: AuthFormType) => {
    useEffect(() => {
        document.title = `${page} | HouseMate`;
    }, []);

    return (
        <Container>
            <FormStyled.FormRow
                align="middle"
                style={{
                    flexDirection: reverse ? 'row-reverse' : 'row',
                }}
            >
                <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <FormStyled.FormContainer>
                        <FormStyled.FormTitle level={1}>{formTitle}</FormStyled.FormTitle>

                        {page === Page.LOGIN && (
                            <LoginStyled.LoginDesc>
                                Home Services Simplified with
                                <Link to={config.routes.home}>
                                    <Text>House</Text>
                                    <Text>Mate</Text>
                                </Link>
                                by Your Side. Get started for free.
                            </LoginStyled.LoginDesc>
                        )}

                        <FormStyled.FormWrapper
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            requiredMark={false}
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
                                {page === Page.LOGIN && (
                                    <LoginStyled.LoginForgotPassword to={config.routes.forgot}>
                                        Forgot Password?
                                    </LoginStyled.LoginForgotPassword>
                                )}
                                <FormStyled.FormButton block type="primary" htmlType="submit">
                                    {page}
                                </FormStyled.FormButton>
                            </FormStyled.FormItem>
                        </FormStyled.FormWrapper>

                        <FormStyled.FormDivider>Or continue with</FormStyled.FormDivider>

                        <FormStyled.FormIconWrapper>
                            <List
                                grid={{
                                    gutter: 56,
                                    column: 3,
                                }}
                                dataSource={socials}
                                renderItem={(social) => {
                                    const Icon = social.icon;

                                    return (
                                        <List.Item>
                                            <Link key={social.key} href={social.href}>
                                                <Icon style={social.style} />
                                            </Link>
                                        </List.Item>
                                    );
                                }}
                            />
                        </FormStyled.FormIconWrapper>

                        <FormStyled.FormRedirect>
                            {redirectDesc}
                            <Link to={redirectLink} title={redirectText}>
                                {redirectText}
                            </Link>
                        </FormStyled.FormRedirect>
                    </FormStyled.FormContainer>
                </Col>

                <Col lg={{ span: 12 }} sm={{ span: 0 }} xs={{ span: 0 }}>
                    <FormStyled.FormCarousel autoplay>
                        {images.map((image) => (
                            <FormStyled.FormImageWrapper key={image.id}>
                                <FormStyled.FormImageOverlay />
                                <FormStyled.FormImage
                                    width="100%"
                                    height={700}
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
        </Container>
    );
};

export default AuthForm;
