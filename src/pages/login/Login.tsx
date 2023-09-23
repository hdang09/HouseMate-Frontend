import { useEffect } from 'react';
import { Col, Row, Form, Input } from 'antd';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook, BsApple } from 'react-icons/bs';

import config from '@/config';
import * as Styled from './Login.styled';
import { theme } from '@/themes';
import Container from '@/components/Container';
import Link from '@/components/Link';

import loginImg01 from '@/assets/images/form-img-01.png';
import loginImg02 from '@/assets/images/form-img-02.png';
import loginImg03 from '@/assets/images/form-img-03.png';
import fallbackImg from '@/assets/images/fallback-img.jpg';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    email?: string;
    password?: string;
};

const Login = () => {
    const images = [
        {
            id: 1,
            src: loginImg01,
        },
        {
            id: 2,
            src: loginImg02,
        },
        {
            id: 3,
            src: loginImg03,
        },
    ];

    useEffect(() => {
        document.title = 'Login | House Mate';
    }, []);

    return (
        <>
            <Container>
                <Row
                    align="middle"
                    style={{
                        height: '100vh',
                    }}
                >
                    <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                        <Styled.FormWrapper>
                            <Styled.FormTitle level={1}>Welcome back!</Styled.FormTitle>

                            <Styled.LoginDesc>
                                Home Services Simplified with
                                <Link to={config.routes.home}>HouseMate</Link>
                                by Your Side. Get started for free.
                            </Styled.LoginDesc>

                            <Form
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                layout="vertical"
                                requiredMark={false}
                                autoComplete="off"
                            >
                                <Styled.FormItem<FieldType>
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'email',
                                            message: 'Please enter a valid email address.',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Styled.FormItem>

                                <Styled.FormItem<FieldType>
                                    label="Password"
                                    name="password"
                                    validateFirst
                                    rules={[
                                        {
                                            required: true,
                                            pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                            message:
                                                'Must be at least 8 characters, include a number, an uppercase letter, and a lowercase letter.',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        iconRender={(visible) =>
                                            visible ? (
                                                <Styled.EyeOutlinedIcon />
                                            ) : (
                                                <Styled.EyeInvisibleOutlinedIcon />
                                            )
                                        }
                                    />
                                </Styled.FormItem>

                                <Styled.FormItem>
                                    <Styled.LoginForgotPassword to="/forgot">
                                        Forgot Password?
                                    </Styled.LoginForgotPassword>
                                    <Styled.FormButton block type="primary" htmlType="submit">
                                        Login
                                    </Styled.FormButton>
                                </Styled.FormItem>
                            </Form>

                            <Styled.FormDivider>Or continue with</Styled.FormDivider>

                            <Styled.FormIconWrapper>
                                <Link href="/">
                                    <FcGoogle size={44} />
                                </Link>
                                <Link href="/">
                                    <BsFacebook size={44} color={theme.colors.facebook} />
                                </Link>
                                <Link href="/">
                                    <BsApple size={44} color={theme.colors.black} />
                                </Link>
                            </Styled.FormIconWrapper>

                            <Styled.LoginNotMember>
                                Not a member?
                                <Link to={config.routes.register} title="Register now">
                                    Register now
                                </Link>
                            </Styled.LoginNotMember>
                        </Styled.FormWrapper>
                    </Col>

                    <Col lg={{ span: 12 }} sm={{ span: 0 }} xs={{ span: 0 }}>
                        <Styled.FormCarousel autoplay>
                            {images.map((image) => (
                                <Styled.FormImageWrapper key={image.id}>
                                    <Styled.FormImageOverlay />
                                    <Styled.FormImage
                                        width="100%"
                                        height={640}
                                        src={image.src}
                                        alt="Form Carousel"
                                        preview={false}
                                        fallback={fallbackImg}
                                    />
                                </Styled.FormImageWrapper>
                            ))}
                        </Styled.FormCarousel>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;
