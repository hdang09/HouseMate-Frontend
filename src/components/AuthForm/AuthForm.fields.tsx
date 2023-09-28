import { Input } from 'antd';
import { Rule } from 'antd/es/form';
import { NamePath } from 'antd/es/form/interface';
import { EyeOutlinedIcon, EyeInvisibleOutlinedIcon } from './AuthForm.styled';

export type FieldType = {
    key: number;
    label: string;
    name: string;
    dependencies?: NamePath[];
    rules: Rule[];
    children: JSX.Element;
};

export const loginFields: FieldType[] = [
    {
        key: 1,
        label: 'Email address',
        name: 'email',
        rules: [
            {
                required: true,
                type: 'email',
                message: 'Please enter a valid email address.',
            },
            {
                max: 50,
                message: 'Please enter at most 50 characters.',
            },
        ],
        children: <Input placeholder=" " />,
    },
    {
        key: 2,
        label: 'Password',
        name: 'password',
        rules: [
            {
                required: true,
                max: 16,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message:
                    'Must be 8 to 16 characters, include a number, an uppercase letter, and a lowercase letter.',
            },
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon /> : <EyeInvisibleOutlinedIcon />
                }
                placeholder=" "
            />
        ),
    },
];

export const registerFields: FieldType[] = [
    {
        key: 1,
        label: 'Email address',
        name: 'email',
        rules: [
            {
                required: true,
                type: 'email',
                message: 'Please enter a valid email address.',
            },
            {
                max: 50,
                message: 'Please enter at most 50 characters.',
            },
        ],
        children: <Input placeholder=" " />,
    },
    {
        key: 2,
        label: 'Full Name',
        name: 'fullName',
        rules: [
            {
                required: true,
                min: 2,
                max: 50,
                message: 'Must be 2 to 50 characters.',
            },
        ],
        children: <Input placeholder=" " />,
    },
    {
        key: 3,
        label: 'Phone Number',
        name: 'phoneNumber',
        rules: [
            {
                required: true,
                pattern: /^(0|\+?84)(3|5|7|8|9)[0-9]{8}$/,
                message: 'Please enter a valid phone number.',
            },
        ],
        children: <Input placeholder=" " />,
    },
    {
        key: 4,
        label: 'Password',
        name: 'password',
        rules: [
            {
                required: true,
                max: 16,
                pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message:
                    'Must be 8 to 16 characters, include a number, an uppercase letter, and a lowercase letter.',
            },
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon /> : <EyeInvisibleOutlinedIcon />
                }
                placeholder=" "
            />
        ),
    },
];

export const forgotPasswordFields: FieldType[] = [
    {
        key: 1,
        label: 'Email address',
        name: 'email',
        rules: [
            {
                required: true,
                type: 'email',
                message: 'Please enter a valid email address.',
            },
            {
                max: 50,
                message: 'Please enter at most 50 characters.',
            },
        ],
        children: <Input placeholder=" " />,
    },
];

export const setPasswordFields: FieldType[] = [
    {
        key: 1,
        label: 'Password',
        name: 'password',
        rules: [
            {
                required: true,
                min: 8,
                message: 'Must be at least 8 characters.',
            },
            {
                pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).+$/,
                message: 'Need number, upper, and lower case.',
            },
            {
                max: 16,
                message: 'Must be at most 16 characters.',
            },
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon /> : <EyeInvisibleOutlinedIcon />
                }
                placeholder=" "
            />
        ),
    },
    {
        key: 2,
        label: 'Confirm Password',
        name: 'confirm',
        dependencies: ['password'],
        rules: [
            {
                required: true,
                message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(
                        new Error('The new password that you entered do not match!'),
                    );
                },
            }),
        ],
        children: (
            <Input.Password
                iconRender={(visible) =>
                    visible ? <EyeOutlinedIcon /> : <EyeInvisibleOutlinedIcon />
                }
                placeholder=" "
            />
        ),
    },
];
