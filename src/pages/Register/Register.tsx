import { useEffect } from 'react';
import { Col, Row, Input, List } from 'antd';
import config from '@/config';
import Link from '@/components/Link';
import Container from '@/components/Container';
import * as FormStyle from '@/pages/Login/Login.styled';
import socials from '../Login/Login.socials';
import images, { fallbackImg } from '../Login/Login.images';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    email?: string;
    fullName?: string;
    phone?: string;
    password?: string;
};

const Register = () => {
    useEffect(() => {
        document.title = 'Register | HouseMate';
    }, []);

    return (
        <Container>
            <Row
                align="middle"
                style={{
                    height: '100vh',
                }}
            >
                <Col lg={{ span: 12 }} sm={{ span: 0 }} xs={{ span: 0 }}>
                    <FormStyle.FormCarousel autoplay>
                        {images.map((image) => (
                            <FormStyle.FormImageWrapper key={image.id}>
                                <FormStyle.FormImageOverlay />
                                <FormStyle.FormImage
                                    width="100%"
                                    height={640}
                                    src={image.src}
                                    alt="Form Carousel"
                                    preview={false}
                                    fallback={fallbackImg}
                                />
                            </FormStyle.FormImageWrapper>
                        ))}
                    </FormStyle.FormCarousel>
                </Col>

                <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <FormStyle.FormWrapper>
                        <FormStyle.FormTitle level={1}>Register</FormStyle.FormTitle>

                        <FormStyle.FormStyle
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            requiredMark={false}
                            autoComplete="off"
                        >
                            <FormStyle.FormItem<FieldType>
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
                            </FormStyle.FormItem>

                            {/* <FormStyle.FormItem<FieldType>
                                label="Full Name"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        min: 2,
                                        message: 'Must be 2 or more characters.',
                                    },
                                ]}
                            >
                                <Input />
                            </FormStyle.FormItem> */}

                            <FormStyle.FormItem<FieldType>
                                label="Phone Number"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                                        message: 'Please enter a valid phone number.',
                                    },
                                ]}
                            >
                                <Input />
                            </FormStyle.FormItem>

                            <FormStyle.FormItem<FieldType>
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
                                            <FormStyle.EyeOutlinedIcon />
                                        ) : (
                                            <FormStyle.EyeInvisibleOutlinedIcon />
                                        )
                                    }
                                />
                            </FormStyle.FormItem>

                            <FormStyle.FormItem>
                                <FormStyle.FormButton block type="primary" htmlType="submit">
                                    Login
                                </FormStyle.FormButton>
                            </FormStyle.FormItem>
                        </FormStyle.FormStyle>

                        <FormStyle.FormDivider>Or continue with</FormStyle.FormDivider>

                        <FormStyle.FormIconWrapper>
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
                                            <Link href={social.href} key={social.key}>
                                                <Icon size={social.size} color={social.color} />
                                            </Link>
                                        </List.Item>
                                    );
                                }}
                            />
                        </FormStyle.FormIconWrapper>

                        <FormStyle.LoginNotMember>
                            Already a member?
                            <Link to={config.routes.login} title="Login now">
                                Login now
                            </Link>
                        </FormStyle.LoginNotMember>
                    </FormStyle.FormWrapper>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
