import Container from '@/components/Container';
import { Col, Row, Form, Input, Carousel } from 'antd';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook, BsApple } from 'react-icons/bs';
import * as Styled from './Login.styled';
import Link from '@/components/Link';
import config from '@/config';

import LoginImg01 from '@/assets/images/login-img-01.avif';
import LoginImg02 from '@/assets/images/login-img-02.avif';
import LoginImg03 from '@/assets/images/login-img-03.avif';

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
                        <Styled.LoginFormWrapper>
                            <Styled.FormTitle level={1}>Welcome back!</Styled.FormTitle>

                            <Styled.LoginDesc>
                                Home Services Simplified with
                                <Styled.LoginBrand to={config.routes.home}>
                                    {' '}
                                    HouseMate
                                </Styled.LoginBrand>{' '}
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
                                            message: 'Please fill out this field.',
                                        },
                                        {
                                            type: 'email',
                                            message: 'Please enter your email.',
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
                                            message: 'Please fill out this field.',
                                        },
                                        {
                                            pattern: /.*[0-9]+.*/,
                                            message: 'Please enter at least 1 number.',
                                        },
                                        {
                                            pattern: /.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]+.*/,
                                            message: 'Please enter at least 1 special character.',
                                        },
                                        {
                                            min: 8,
                                            message: 'Please enter at least 8 characters.',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        iconRender={(visible) =>
                                            visible ? (
                                                <Styled.EyeOutlinedStyled />
                                            ) : (
                                                <Styled.EyeInvisibleOutlinedStyled />
                                            )
                                        }
                                    />
                                </Styled.FormItem>

                                <Styled.FormItem>
                                    <Styled.LoginForgotPassword to={config.routes.forgot}>
                                        Forgot Password?
                                    </Styled.LoginForgotPassword>
                                    <Styled.LoginButton block type="primary" htmlType="submit">
                                        Login
                                    </Styled.LoginButton>
                                </Styled.FormItem>
                            </Form>

                            <Styled.LoginDivider>Or continue with</Styled.LoginDivider>

                            <Styled.LoginIconWrapper>
                                <FcGoogle size={44} />
                                <BsFacebook size={44} color="#1877F2" />
                                <BsApple size={44} />
                            </Styled.LoginIconWrapper>

                            <Styled.LoginNotMember>
                                Not a member?
                                <Link href={config.routes.register}>Register now</Link>
                            </Styled.LoginNotMember>
                        </Styled.LoginFormWrapper>
                    </Col>

                    <Col lg={{ span: 12 }} sm={{ span: 0 }} xs={{ span: 0 }}>
                        <Carousel autoplay effect="fade">
                            <Styled.LoginImage
                                width="100%"
                                height={640}
                                src={LoginImg01}
                                preview={false}
                                fallback=""
                            />
                            <Styled.LoginImage
                                width="100%"
                                height={640}
                                src={LoginImg02}
                                preview={false}
                                fallback=""
                            />
                            <Styled.LoginImage
                                width="100%"
                                height={640}
                                src={LoginImg03}
                                preview={false}
                                fallback=""
                            />
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;
